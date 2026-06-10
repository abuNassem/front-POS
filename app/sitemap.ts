import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/auth/login`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${siteUrl}/auth/register`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
