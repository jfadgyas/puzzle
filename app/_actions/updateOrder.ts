'use server'

import dbConnect from "../lib/dbConnect"

const updateOrder = async (session: Record<string, any>) => {
    
    dbConnect()

    const newOrder = {
        created: session.created,
        checkout_id: session.id,
        total: session.amount_total,
        currency: session.currency,
        paymentIntent: session.payment_intent,
        status: session.payment_status,
        isRefunded: false,
        products: JSON.parse(session.metadata.cart)
    } 

    const URI = 'http://localhost:3000/api/db'
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH',
            // mode: 'cors',
            body: JSON.stringify(newOrder)
        }

        return await fetch(URI, options).then(res => res.json())
}

export default updateOrder