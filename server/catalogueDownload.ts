import type { Express } from "express";
import { storageGetSignedUrl } from "./storage";

const catalogueKey = "MAS_Traders_all_21_industrial_divisions_Catalogue_27_Aug_2026_3d1617ba.pdf";
const downloadName = "MAS_Traders_Industrial_Catalogue_27_Aug_2026.pdf";

export async function fetchOfficialCatalogue(): Promise<Buffer> {
  const signedUrl = await storageGetSignedUrl(catalogueKey);
  const upstream = await fetch(signedUrl);
  if (!upstream.ok) throw new Error(`Official catalogue fetch failed (${upstream.status})`);
  return Buffer.from(await upstream.arrayBuffer());
}

export function registerCatalogueDownloadRoute(app: Express) {
  app.get("/api/catalogue/download", async (_req, res) => {
    try {
      const file = await fetchOfficialCatalogue();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", String(file.length));
      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
      res.setHeader("Cache-Control", "private, max-age=300");
      res.status(200).send(file);
    } catch (error) {
      console.error("[CatalogueDownload] Failed to proxy official catalogue", error);
      res.status(502).json({ error: "The official catalogue is temporarily unavailable. Please try again shortly." });
    }
  });
}
