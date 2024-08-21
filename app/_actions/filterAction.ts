'use server'

const filterAction = (item: Record<string, any>, searchParams: { [key: string]: string | string[] | undefined } ) => {
       
    return Object.keys(item._doc).every(key => {
        if (searchParams[key]){
            const newSearch = Array.isArray(searchParams[key]) ? searchParams[key] : Array.of(searchParams[key])
            if (newSearch === undefined) return null
            if ((key === 'price' || key === 'forAge' || key === 'pieces')){
                return (newSearch as string[]).some(filter => {
                    const minPrice = filter.split('-')[0]
                    const maxPrice = filter.split('-')[1]
                    return item[key] >= +minPrice && item[key] <= +maxPrice
                })
            }
            if (key === 'tags'){
                return newSearch.some(filter => item[key].includes(filter))
            }
            if ((key === 'isOnSale' || key === 'make')){
                return newSearch.some(filter => item[key].toString() === filter)
            }
        }
        return item
    })
}

export default filterAction