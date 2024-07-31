import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const Orders = async ({searchParams}: {searchParams: {session_id: string}}) => {

    // const event: Record<string, any> = await stripe.events.retrieve(orders[0].event_id)
    
    // console.log(event)

    // const z=await stripe.paymentIntents.retrieve('pi_3Pb6pMLbUtSArnvU1A5zY84w')
    // const z=await stripe.checkout.sessions.list()
    // const z=await stripe.checkout.sessions.listLineItems('cs_test_b1sAYacUSKBo9m9OXyzV5GmcbGVsgIYKwW9UiiA72E4c927NgYJu9gPGao')
    // console.log(JSON.parse(z.metadata.cart))
    
    const session = await stripe.checkout.sessions.retrieve('cs_test_a1XLrKFcdKAJlc05Ng7kujXjIOJlSZUeCUJddPKhbxilog61w6lajqxEet')
    // const session = await stripe.checkout.sessions.retrieve(searchParams.session_id)
    // console.log(session)

    
    const getShipping = (customer) => {
        
        return (
            <div>
                <p className=''>{customer.name}</p>
                <p className=''>{customer.email}</p>
                <p className=''>{customer.phone}</p>
                <p className=''>{customer.address.line1}</p>
                <p className=''>{customer.address.line2}</p>
                <p className=''>{customer.address.postal_code}</p>
                <p className=''>{customer.address.city}</p>
                <p className=''>{customer.address.country}</p>
            </div>
        )
    }

    const getCart = (cart) => {
        
        const showCart = cart.map(item => 
            <div key={item.product}>
                <p>{item.product}</p>
                <p>{item.qty}</p>
            </div>
        )
        
        return (
            <div>
                {showCart}
            </div>
        )
    }

    return (
        <div>
            fetch orders, find this (op basis van what?) checkoutsession id
            <p>id: {session.id}</p>
            <p>{session.metadata?.orderId}</p>
            <p>{new Date(session.created).toLocaleDateString()}</p>
            <p>{(session.amount_total! / 100).toFixed(2)}</p>
            <p>{session.currency}</p>
            <p>{session.payment_status}</p>
            <div className=''>
                {getShipping(session.customer_details)}
            </div>
            <div>
                link to view products, vagy modal
                {getCart(JSON.parse(session.metadata!.cart))}
            </div>
        </div>
    )
}

export default Orders