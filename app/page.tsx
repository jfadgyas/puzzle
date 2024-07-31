import ProductsPage from "./products/page"

const MainPage = ({searchParams}: {searchParams: Record<string, any>}) => {

    return (
        <main>
            search
            filter
            <ProductsPage searchParams={searchParams} />
        </main>
    )
}

export default MainPage