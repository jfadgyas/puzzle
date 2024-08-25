import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// import dbConnect from "../lib/dbConnect";
import Orders from "../models/orders";
import Puzzles from '@/app/models/puzzles'

const OrdersPage = async ({searchParams}: {searchParams: {session_id: string}}) => {

    const styles = {
        orderNumber: {
            fontSize: '1.4em',
            textAlign: 'center' as const,
            textTransform: 'uppercase' as const
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const
        },
        tableTitle: {
            padding: '1em',
            fontSize: '1.2em',
            fontweight: 'bold' as const,
            textTransform: 'uppercase' as const
        },
        tableProductHeader: {            
            background: 'cornflowerblue',
            fontSize: '13px',
            textTransform: 'capitalize' as const
        },
        tableCell: {
            padding: '0.25em 0',
            verticalAlign: 'top'
        },
        tableCellHead: {
            padding: '0.5em 0',
            verticalAlign: 'top'
        },
        itemImg: {
            width: '150px',
            height: 'auto',
        },
        itemTitle: {
            marginTop: '0',
            fontWeight: 'bold',
            textTransform: 'uppercase' as const
        },
        itemDesc: {
            margin: '0',
            color: '#868686'
        },
        itemPrice: {
            margin: '0',
            textAlign: 'right' as const
        },
        itemRow: {
            borderBottom: '1px solid hotpink',
        },
        summaryItem: {
            display: 'flex',
            flexDirection: 'column' as const,
            marginBottom: '0',
            fontSize: '13px',
            letterSpacing: '1.25px' as const,
            textTransform: 'uppercase' as const,
        },
    }
    
    // Get stripe session
    const session = await stripe.checkout.sessions.retrieve(searchParams.session_id)
    
    // Get order from db
    const order = await Orders
        .findOne({checkout_id: searchParams.session_id})
        .populate('products.product', 'pic model pieces price', Puzzles)
    
    // Prepare sold items
    const getItems = () => {

        const cart: Record<string, any>[] = order.products
        const showCart = cart.map(item => 
            <tr style={styles.itemRow} key={item.product._id}>
                <td style={styles.tableCell} width='min-content'>
                    <img style={styles.itemImg} src={item.product.pic[0]} alt='item' />
                </td>
                <td style={styles.tableCell}>
                    <p style={styles.itemTitle}>{item.product.model}</p>
                    <p style={styles.itemDesc}>{item.product.pieces} pcs</p>
                    <p style={styles.itemDesc}>Qty: {item.qty}</p>
                </td>
                <td style={styles.tableCell}>
                    <p style={styles.itemPrice}>
                        <strong>
                            € {(item.qty * item.product.price).toFixed(2)}
                        </strong>
                    </p>
                </td>
            </tr>
        )
        
        return showCart
    }

    // Payment info
    const getPayment = () => {
        return (
            <tbody>
                <tr style={styles.itemRow}>
                    <th style={styles.tableTitle} colSpan={3}>
                        payment summary
                    </th>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            subtotal:                            
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.itemPrice}>
                            € {(order.products.reduce((subTotal: number, item: Record<string, any>) => {subTotal += item.qty * item.product.price; return subTotal}, 0)).toFixed(2)}
                        </p>
                    </td>
                </tr>
                {/* session.total_details?.amount_discount && */}
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            discount:                            
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.itemPrice}>€ {session.total_details?.amount_discount.toFixed(2)}</p>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            Shipping:                            
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.itemPrice}>€ {(session.shipping_cost!.amount_total / 100).toFixed(2)}</p>
                    </td>
                </tr>
                <tr style={styles.itemRow}>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            Tax (Inclusive)                            
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.itemPrice}>€ {((order.total * 0.1736) / 100).toFixed(2)}</p>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            <strong>
                                Total Amount:
                            </strong>
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.itemPrice}>
                            <strong>
                                € {(order.total / 100).toFixed(2)}                                
                            </strong>
                        </p>
                    </td>
                </tr>
            </tbody>
        )
    }

    // Shipping info // billing address?
    const getShipping = () => {

        const customer = session.customer_details!
        const shipping = session.shipping_details!
        
        return (
            <tbody>
                <tr style={styles.itemRow}>
                    <th style={styles.tableTitle} colSpan={3}>
                        your details
                    </th>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            name
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <span style={styles.summaryItem}>
                            mobile
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            <strong>
                                {customer.name}
                            </strong>
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <span style={styles.summaryItem}>
                            <strong>
                                {customer.phone}
                            </strong>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <p style={styles.summaryItem}>
                            email
                        </p>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.summaryItem}>
                            Order Date:
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <span style={styles.summaryItem}>
                            <strong>
                                {customer.email}
                            </strong>
                        </span>
                    </td>
                    <td style={styles.tableCell}>
                        <span style={styles.summaryItem}>
                            <strong>
                                {new Date(order.created).toLocaleDateString()}
                            </strong>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <p style={styles.summaryItem}>
                            Shipping to:                            
                        </p>
                    </td>
                    <td style={styles.tableCell}>
                        <p style={styles.summaryItem}>
                            Billing to:
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={styles.tableCell} colSpan={2}>
                        <strong>
                            <span style={styles.summaryItem}>{shipping.address?.line1}</span>
                            <span style={styles.summaryItem}>{shipping.address?.line2}</span>
                            <span style={styles.summaryItem}>{shipping.address?.postal_code}</span>
                            <span style={styles.summaryItem}>{shipping.address?.city}</span>
                            <span style={styles.summaryItem}>{shipping.address?.country}</span>
                        </strong>
                    </td>
                    <td style={styles.tableCell}>
                        {/* renderif billing info */}
                        <strong>
                            <span style={styles.summaryItem}>{customer.address?.line1}</span>
                            <span style={styles.summaryItem}>{customer.address?.line2}</span>
                            <span style={styles.summaryItem}>{customer.address?.postal_code}</span>
                            <span style={styles.summaryItem}>{customer.address?.city}</span>
                            <span style={styles.summaryItem}>{customer.address?.country}</span>
                        </strong>
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <section className="order-details">
            <h2 style={styles.orderNumber}>
                Order Number: {order._id.toString()}
            </h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableTitle} colSpan={3}>Order summary</th>
                    </tr>
                    <tr style={styles.tableProductHeader}>
                        <th style={styles.tableCellHead}>item</th>
                        <th style={styles.tableCellHead}>information</th>
                        <th style={styles.tableCellHead}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {getItems()}
                </tbody>
                {getPayment()}
                {getShipping()}                
            </table>
        </section>
    )
}

export default OrdersPage