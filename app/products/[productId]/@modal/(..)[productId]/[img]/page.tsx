import Image from "next/image"

import Modal from "@/app/components/Modal"

const ModalImage = ({params}: {params: {img: string}}) => {

    return (
        <Modal>
            <Image
                // className={style.pic}
                style={{width: '100%', height: 'auto'}}
                src={`/${params.img}`}
                // fill
                width={900}
                height={600}
                alt='Big picture'
            />
            <p>Original size</p>
        </Modal>
    )
}

export default ModalImage