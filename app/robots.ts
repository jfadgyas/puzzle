import type { MetadataRoute } from "next";

const baseUrl = 'https://puzzleplaza.netlify.app'

export function robots(): MetadataRoute.Robots{

    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: [],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}