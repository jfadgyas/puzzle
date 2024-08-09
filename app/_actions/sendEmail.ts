import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (emailType: string, details: Record<string, any>) => {
    
    let email

    // Create email based on the type. Import on the fly components, to create the mail
    switch (emailType){
        case 'contact': 
            email = {
                from: `${details.yourname} <onboarding@resend.dev>`, //${details.email} custom domain
                to: ['wikraamnicholeas@gmail.com'],
                reply_to: details.email as string,
                subject: 'Contact form',
                text: details.message
            }
            break
        case 'order': 
            email = await import('../components/Emails/PurchaseSuccess').then(({
                    default: PurchaseSuccess
                }) => ({
                from: 'Puzzle Plaza <onboarding@resend.dev>', //own email needs custom domain noreply@puzzleplaza.com
                to: ['wikraamnicholeas@gmail.com', details.customer_details.email], // customer email
                reply_to: 'noreply@puzzleplaza.com',
                subject: 'Order confirmation',
                react: PurchaseSuccess(details)
            }))
            break
        default: throw new Error('Incorrect message type. Please try again later!')
    }

    // Send email
    try{
        const {data, error} = await resend.emails.send(email)

        if (error) throw error

        return {type: 'success', message: '', data: data}
    }
    catch(err: any){
        console.log(err)
        return {type: 'error', message: 'Error sending message, please try again'}
    }
}

export default sendEmail