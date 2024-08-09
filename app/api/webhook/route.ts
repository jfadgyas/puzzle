import { NextRequest, NextResponse } from "next/server";

import updateOrder from "@/app/_actions/updateOrder";
import sendEmail from "@/app/_actions/sendEmail";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest){

    const sig = req.headers.get('Stripe-Signature')
    const payload = await req.text()
    // const checkout = JSON.parse(payload)

    try {
        // Create stripe event
        const event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        console.log('webhook:', event.type)

        // Checkout completed doesn't mean it is paid!!!
        if (event.type === 'checkout.session.completed'){
            const session = event.data.object
            const order = await updateOrder(session)
            const email = await sendEmail('order', session) //, order
        }

        if (event.type === 'checkout.session.expired'){
            // send email Your payment expired and your order couldn’t be processed.
            return console.log('expired', event.data.object)
        }

        // Late payment, dont use at the moment
        if (event.type === 'checkout.session.async_payment_failed'){
            // send email Your order was received and is awaiting payment confirmation.
            const session = event.data.object
            // console.log('async fail', event.data.object)
        }

        if (event.type === 'checkout.session.async_payment_succeeded'){
            // send email Your payment is confirmed and your order is complete.
            const session = event.data.object
            const order = await updateOrder(session)
            // console.log('async success', event.data.object)
        }

        return NextResponse.json(event)
    }
    catch(err){
        return NextResponse.json(err)
    }
}