import dbConnect from "../lib/dbConnect"
import Puzzles from "../models/puzzles"

const getDb = async (searchParams: { [key: string]: string | string[] | undefined }) => {

    // Filter
    let filter: Record<string, any> = {}
    Object.keys(searchParams).map((key: string) => {
        if (key === 'sort') return 
        if (key === 'price' || key === 'forAge' || key === 'pieces'){
            const newSearch = Array.isArray(searchParams[key]) ? searchParams[key] : Array.of(searchParams[key])
            if (newSearch === undefined) return null

            let newFilter: Record<string, any>[] = []

            // Why forEach doesn't work???
            const zFilter = (newSearch as string[]).map(item => {
                const minValue = item!.split('-')[0]
                const maxValue = item!.split('-')[1]
                newFilter.push({[key]: {$gte: +minValue, $lte: +maxValue}})
            })
            
            return filter['$and'] = {$or: newFilter}
        }
        filter[key] = {$in: searchParams[key]}
    })

    // Sort
    const sort = searchParams.sort as string || '{}'

    await dbConnect()
    const puzzleDb = await Puzzles
        .find(filter)
        .sort(JSON.parse(sort))
   
    return puzzleDb
}

export default getDb