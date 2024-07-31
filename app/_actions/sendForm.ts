'use server'

const sendForm = async (prevState: any, formData: FormData): Promise<any> => {

    // Validate form data

    const newState = {...prevState}

    // Error messages to return 
    const invalidMessages: Record<string, any> = {
        yourname: 'Can I call you Al?',
        email: "Can't reach you on this email address",
        phone: "Can't call you on this number",
        message: 'Would you like to tell us something?'
    }

    // Function to return error
    const setError = (key: string) => {
        newState.invalid[key] = invalidMessages[key]
    }

    try{
        
        // Validation
        // Iterate through the received fields, set/reset errors
        const data = Object.fromEntries(formData)
        for (let [key, value] of Object.entries(data)){
            // FormData includes fields with $ACTION..., skip those
            if (key.startsWith('$')) continue
            // If field is not empty, but value doesnt pass the requirements, set error
            if (value){                
                if (key === 'email'){
                    const emailRegex = /^((?!\.)[\-\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
                    if (!emailRegex.test(value as string)){
                        setError(key)
                        continue
                    }
                }
                if (key === 'phone'){
                    const phoneRegex = /\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}/
                    phoneRegex.test(value as string)
                    if (!phoneRegex.test(value as string)){
                        setError(key)
                        continue
                    }
                }
                newState.invalid[key] = ''
                continue
            }
            setError(key)
        }

        // If any field is incorrect, throw an error
        for (let [key, value] of Object.entries(newState.invalid)){
            if (value) throw new Error('Can not submit a form with errors')
        }

        // Send email with formdata details
        
        return {...newState, type: 'success', message: 'Thank you for your message!', formKey: !prevState.formKey}
        
    }
    catch(err: any){
        console.error(err.message)
        return {...newState, type: 'error', message: err.message}
    }
}

export default sendForm