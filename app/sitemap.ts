import type { MetadataRoute } from "next"

import Puzzles from "./models/puzzles"

const baseUrl = 'https://puzzleplaza.netlify.app'

export default async function sitemap(){

    const puzzledb = await Puzzles.find()

    const puzzleUrl = puzzledb.map(puzzle => {
        return {
            url: `${baseUrl}/products/${puzzle.id}`,
            lastModified: new Date()
        }
    })

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date()
        },
        ...puzzleUrl
    ]
}