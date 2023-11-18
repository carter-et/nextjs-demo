'use server'

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const { db } = require('@vercel/postgres');

const FormSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email('This is not a valid email').min(1, { message: 'This field has to be filled.' }),
    message: z.string(),
    date: z.string()
})

const SubmitContactUsForm = FormSchema.omit({id: true, date: true})

export type State = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string | null; //not the user message, but the overall form status
}

export async function submitContactUsForm(
    prevState: State | undefined,
    formData: FormData
) {
    const validatedFields = SubmitContactUsForm.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Unable to submit Contact Us Form. Please make sure all fields are filled out correctly.'
        }
    }

    const { firstName, lastName, email, message } = validatedFields.data;

    console.log('attempting to save to postgresdb', validatedFields.data)

    const client = await db.connect();

    try {
        await client.sql`
            INSERT INTO contacts (firstname, lastname, email, message)
            VALUES (${firstName}, ${lastName}, ${email}, ${message});
        `;
        await client.end();
    } catch (error) {
        await client.end();
        return {
            message: 'Database Error: Failed to add Contact.'
        }
    }
    revalidatePath('/contact-us');
    redirect('/contact-us');
}