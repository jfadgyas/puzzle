'use client'

import { useRef, KeyboardEvent, FocusEvent, useActionState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';

import Icon from '@mdi/react';
import { 
    mdilAccount,
    mdilEmail,
    mdilPhone,
    mdilMessageText,
    mdilCheck,
    mdilAlert
} from '@mdi/light-js'

import sendForm from '../_actions/sendForm';

import style from './style/contactform.module.scss'

// The button must be apart from the form, and called as a component
const SendButton = () => {
    const {pending} = useFormStatus()

    return (
        <button
            className={style.button}
            aria-disabled={pending}
            >
            {pending ? 'submitting...' : 'submit'}
        </button>
    )
}

const ContactForm = () => {

    // Create input refs. Must create like this with a helper function because of typescript
    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([])
    
    const addRef = (ref: HTMLInputElement | HTMLTextAreaElement) => {
        inputRefs.current.push(ref)
    }
    
    // Create state for form submitting function
    const initialState = {
        invalid: {
            yourname: '',
            email: '',
            phone: '',
            message: ''
        },
        type: '',
        message: '',
        formKey: false // Reset form with key, if submit is successfull
    }

    const [state, formAction] = useFormState(sendForm, initialState) // action, initialState    

    // Focus goes to next field on Enter
    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const index = +e.currentTarget.dataset.index!
            if (index < 3) return inputRefs.current[index + 1].focus()
        }
    }
    
    // Display error message for input fields
    const showError = (errorField: HTMLSpanElement, message: string) => errorField.innerText = message

    // Input field validation
    const validate = (e: FocusEvent<HTMLInputElement, Element> | FocusEvent<HTMLTextAreaElement, Element>) => {
        
        const field = e.target
        const errorField = e.target.nextElementSibling
        let message = ''

        // Check if the field is ok
        if (field.matches(':valid')) return showError(errorField as HTMLSpanElement, message)
        
        // Otherwise
        switch (field.id){
            case 'yourname': 
                // Name can only be empty
                message = 'Can I call you Al?'
                break
            case 'message': 
                // Message can only be empty
                message = 'Would you like to tell us something?'
                break
            case 'email':
                // Incorrect email
                message = "Can't reach you on this email address"
                break
            case 'phone': 
                // Incorrect phone
                message = "Can't call you on this number"
                break
            default: return
        }
        showError(errorField as HTMLSpanElement, message)
    }

    return (
        <section id='contact' className={style.contact}>
            <h3 className={style.title}>Contact form</h3>           
            <form
                key={state.formKey}
                noValidate
                className={style.form}
                id='contactForm'
                action={formAction}
                >
                <label className={style.label} htmlFor='name'>
                    <Icon className={style.icon} path={mdilAccount} />
                    <input
                        className={style.input}
                        id='yourname'
                        type='text'
                        name='yourname'
                        placeholder='Your name'
                        required={true}
                        data-index='0'
                        ref={ref => addRef(ref as HTMLInputElement)}
                        onBlur={validate}
                        onKeyUp={handleKey}
                    />
                    <span className={`${style['error']} ${style['error--input']}`}>
                        {state.invalid.yourname}
                    </span>
                </label>
                <label className={style.label} htmlFor='email'>
                    <Icon className={style.icon} path={mdilEmail} />
                    <input
                        className={style.input}
                        id='email'
                        type='text'
                        name='email'
                        placeholder='Email'
                        pattern='^((?!\.)[\-\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$'
                        required={true}
                        data-index='1'
                        ref={ref => addRef(ref as HTMLInputElement)}
                        onBlur={validate}
                        onKeyUp={handleKey}
                    />
                    <span className={`${style['error']} ${style['error--input']}`}>
                        {state.invalid.email}
                    </span>
                </label>
                <label className={style.label} htmlFor='phone'>
                    <Icon className={style.icon} path={mdilPhone} />
                    <input
                        className={style.input}
                        id='phone'
                        type='text'
                        name='phone'
                        placeholder='Phone'
                        pattern='\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
                        required={true}
                        data-index='2'
                        ref={ref => addRef(ref as HTMLInputElement)}
                        onBlur={validate}
                        onKeyUp={handleKey}
                    />
                    <span className={`${style['error']} ${style['error--input']}`}>
                        {state.invalid.phone}
                    </span>
                </label>
                <label className={style.label} htmlFor='message'>
                    <Icon className={style.icon} path={mdilMessageText} />
                    <textarea
                        className={style.message}
                        id='message'
                        name='message'
                        placeholder='Message'
                        required={true}
                        data-index='3'
                        ref={ref => addRef(ref as HTMLTextAreaElement)}
                        onBlur={validate}
                    ></textarea>
                    <span className={`${style['error']} ${style['error--input']}`}>
                        {state.invalid.message}
                    </span>
                </label>
                <input className={style.hidden} type='submit' disabled aria-hidden='true' />
                <SendButton />
                <p className={`${style['result']} ${style[state.type]}`}>
                    {state.type &&
                        <Icon className={`${style['icon']} ${style[state.type]}`} path={state.type === 'success' ? mdilCheck : mdilAlert} />
                    }
                    {state.message}
                </p>
            </form>
        </section>
    )
}

export default ContactForm