import Filter from "./components/Filter"
import ProductsPage from "./products/page"

import filterAction from "./_actions/filterAction"

import Puzzles from "./models/puzzles"

const MainPage = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    // Get db
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
        <main>
            search
            sort
            <Filter brands={brands} tags={tags} />
            <ProductsPage puzzles={puzzles} />
        </main>
    )
}

export default MainPage