import Image from "next/image"

const showImage = ({params}: {params: {img: string}}) => {
    return (
        <main id='bigpicture'>
            {params.img}
            show big picture,
            <Image
                className='{style.pic}'
                src={`/${params.img}`}
                width={640}
                height={480}
                alt=''
            />
            show ?product=productid ??
        </main>
    )
}

export default showImage