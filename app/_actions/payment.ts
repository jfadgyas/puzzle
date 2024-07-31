'use server'

import { cookies } from "next/headers"

// import createOrder from "./createOrder"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const payment = async (cart: Record<string, any>[], shipping: Record<string, any>) => {

    // Create line items for stripe
    // Metadata for handling cart
    // Total for order in DB
    let metaData: Record<string, any>[] = []
    let total: number = shipping.cost as number
    const cartItems = cart.map((item) => {
        total += item.qty * item.product.price
        metaData.push({
            product: item.product._id,
            qty: item.qty
        })
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.product.model,
                },
                unit_amount: Math.round(item.product.price * 100) //for price ending with 5 cents
            },
            quantity: item.qty
        }          
    })
    
    try{
        
        // Create order in database. Can not do it here, until I collect email address from the user
        // const order = await createOrder(metaData, total)

        // Create actual session with payment link
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: cartItems,
            metadata: {cart: JSON.stringify(metaData)},
            mode: 'payment',
            payment_method_types: ['card', 'ideal'],
            shipping_address_collection: {
                allowed_countries: [shipping.code]
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: Math.round(shipping.cost * 100),
                            currency: 'eur',
                        },
                        display_name: 'DPD shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: { // for DPD
                enabled: true
            },
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel'
        })

        // Set cart as cookie, to be able to retrive contents
        cookies().set('cart', JSON.stringify(cart), {
            secure: true,
            expires: Date.now() + 86400000 // 1 day
        })
        cookies().set('shipping', JSON.stringify(shipping), {
            secure: true,
            expires: Date.now() + 86400000 // 1 day
        })
        // cookies().set('orderId', order._id, {
        //     secure: true,
        //     expires: Date.now() + 86400000 // 1 day
        // })

        return checkoutSession.url
    }
    catch(err){
        console.log(err)
        return null
    }
}

export default payment