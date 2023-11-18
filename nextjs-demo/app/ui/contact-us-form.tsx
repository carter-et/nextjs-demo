'use client'

import { Button } from './button'
import { useFormState } from 'react-dom'
import { State, submitContactUsForm } from '@/app/lib/actions'

export default function ContactUsForm() {
    const initialState = { message: null, errors: {} } as State;
    const [state, dispatch] = useFormState(submitContactUsForm, initialState)

    return (
        <form action={dispatch} className="flex bg-gray-50 p-4 m-16 md:p-6 max-w-4xl w-full font-arial" >
            <div className="flex flex-col  justify-center w-full">
                <h1 className={`mb-3 text-38 font-bold`}>
                    Contact Us Form
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-16 font-medium text-gray-900"
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full border border-blue-400 py-[9px] pl-4 text-16 outline-2 placeholder:text-gray-500"
                                id="firstName"
                                type="firstName"
                                name="firstName"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-16 font-medium text-gray-900"
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full border border-blue-400 py-[9px] pl-4 text-16 outline-2 placeholder:text-gray-500"
                                id="lastName"
                                type="lastName"
                                name="lastName"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-16 font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full border border-blue-400 py-[9px] pl-4 text-16 outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder=""
                                required
                                aria-describedby="email-error"
                            />
                        </div>
                    </div>
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.email &&
                        state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-16 font-medium text-gray-900"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <div className="relative">
                            <textarea
                                className="break-words peer block w-full border h-48 min-h-full border-blue-400 py-[9px] pl-4 text-16 outline-2 placeholder:text-gray-500"
                                id="message"
                                name="message"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {<p className="mt-2 text-sm text-red-500" key={state?.message}>
                            {state?.message}
                        </p>}
                    </div>
                    <Button type="submit"> Submit</Button>
                </div>
            </div>
        </form>
    )

}