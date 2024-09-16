import type { MetadataRoute } from "next";

const baseUrl = 'https://puzzleplaza.netlify.app'

export default function robots(): MetadataRoute.Robots{

    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: [],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}