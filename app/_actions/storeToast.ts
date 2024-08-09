'use server'

import { revalidatePath } from "next/cache"

const storeToast = async () => {
    revalidatePath('.')
}

export default storeToast