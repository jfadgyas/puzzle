import dbConnect from "./lib/dbConnect";
import Filter from "./components/Filter"
import Products from '@/app/components/Products'
import filterAction from "./_actions/filterAction"

import Puzzles from "./models/puzzles"

const MainPage = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    // Get db
    await dbConnect()
    const puzzleDb = await Puzzles.find()
    
    // Prepare brands for filtering // maybe a for of loop, prepare both in 1 go?
    const brands = puzzleDb.reduce((brands: string[], item: Record<string, any>) => {
        !brands.includes(item.make) && brands.push(item.make)
        return brands}
    ,[])
    
    // Prepare tags for filtering
    const tags = puzzleDb.reduce((tags, item) => {
        item.tags.map((tag: string) => !tags.includes(tag) && tags.push(tag))
        return tags}
    ,[])

    // Filter db
    const puzzles = puzzleDb.filter(item => filterAction(item, searchParams))

    return (
        <main id='start'>
            search
            sort
            <Filter brands={brands} tags={tags} />
            <Products puzzles={puzzles} />
        </main>
    )
}

export default MainPage