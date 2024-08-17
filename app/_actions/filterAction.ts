'use server'

const filterAction = (item: Record<string, any>, searchParams: { [key: string]: string | string[] | undefined } ) => {
    
    const newSearch = Array.isArray(searchParams.tags) ? searchParams.tags : [searchParams.tags]
    
    return Object.keys(item._doc).every(key => {
        const newSearch = Array.isArray(searchParams[key]) ? searchParams[key] : [searchParams[key]]
        if ((key === 'price' || key === 'forAge' || key === 'pieces') && searchParams[key]){
            return newSearch.some(filter => {
                const minPrice = filter!.split('-')[0]
                const maxPrice = filter!.split('-')[1]
                return item[key] >= +minPrice && item[key] <= +maxPrice
            })
        }
        if (key === 'tags' && searchParams[key]){
            return newSearch.some(filter => item[key].includes(filter))
        }
        if ((key === 'isOnSale' || key === 'make') && searchParams[key]){
            return newSearch.some(filter => item[key].toString() === filter)
        }
        return item
    })
}

export default filterAction