import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createQuoteRequest } from "./db";
import { storagePut } from "./storage";

const quoteItemSchema = z.object({
  id: z.string().min(1).max(220),
  name: z.string().min(1).max(220),
  category: z.string().min(1).max(220),
  quantity: z.number().int().positive().max(100000),
  note: z.string().max(1000).optional(),
});

const attachmentSchema = z.object({
  filename: z.string().min(1).max(180),
  mimeType: z.string().min(1).max(120),
  base64: z.string().min(1).max(3_000_000),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  rfq: router({
    create: publicProcedure.input(z.object({
      name: z.string().trim().min(2).max(160),
      phone: z.string().trim().min(5).max(80),
      email: z.string().trim().email().max(320),
      company: z.string().trim().max(240).optional(),
      notes: z.string().trim().max(5000).optional(),
      items: z.array(quoteItemSchema).max(100),
      attachments: z.array(attachmentSchema).max(2).optional(),
    })).mutation(async ({ input }) => {
      const reference = `RFQ-${new Date().getUTCFullYear()}-${nanoid(6).toUpperCase()}`;
      const attachments = input.attachments?.length ? await Promise.all(input.attachments.map(async (file) => {
        const cleanName = file.filename.replace(/[^a-zA-Z0-9._-]/g, "-");
        const { key, url } = await storagePut(
          `rfq/${reference}/${cleanName}`,
          Buffer.from(file.base64, "base64"),
          file.mimeType,
        );
        return { filename: file.filename, mimeType: file.mimeType, key, url };
      })) : undefined;
      await createQuoteRequest({
        reference,
        name: input.name,
        phone: input.phone,
        email: input.email,
        company: input.company,
        notes: input.notes,
        itemsJson: input.items,
        attachmentsJson: attachments,
      });
      return { reference };
    }),
  }),
});

export type AppRouter = typeof appRouter;
