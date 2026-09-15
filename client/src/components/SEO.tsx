import { useEffect } from "react";

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  structuredData?: Record<string, any> | Array<Record<string, any>>;
};

const DEFAULT_TITLE = "M.A.S. Traders | Best Traders, Hardwares & Tools in Kovilpatti";
const DEFAULT_DESCRIPTION =
  "M.A.S. Traders is Kovilpatti's top-rated industrial supplier and hardware store. Browse 21 divisions of power tools, hand tools, pipes, fittings, electricals, safety equipment, fasteners, and request instant quotations.";
const DEFAULT_KEYWORDS =
  "Kovilpatti best traders, hardwares Kovilpatti, tools Kovilpatti, hardware shop near me, industrial tools supplier Kovilpatti, pipes and fittings Kovilpatti, electricals Kovilpatti, power tools Kovilpatti, safety equipment Tamil Nadu, M.A.S. Traders";
const BASE_URL = "https://mas-traders.com";
const DEFAULT_IMAGE = `${BASE_URL}/manus-storage/logo.png`;

function setMetaTag(nameOrProperty: "name" | "property", key: string, content: string) {
  let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(nameOrProperty, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // 3. Canonical Tag
    const fullCanonical = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${BASE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical}`
      : BASE_URL;

    let linkCanonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", fullCanonical);

    // 4. OpenGraph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "M.A.S. Traders Kovilpatti");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. Dynamic JSON-LD Structured Data
    const scriptId = "dynamic-seo-jsonld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount: remove dynamic JSON-LD
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData]);

  return null;
}
