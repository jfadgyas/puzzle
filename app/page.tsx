import ProductsPage from "./products/page"

const MainPage = ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {

    return (
        <main>
            search
            filter
            <ProductsPage searchParams={searchParams} />
        </main>
    )
}

export default MainPage