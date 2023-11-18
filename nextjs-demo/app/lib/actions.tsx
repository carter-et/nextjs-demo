'use server'

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

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

export type Data = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

//used code taken from this post: https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery

const fs = require('fs'); //putting all of this b.s. close together for easy removal
//honestly, this is a stupid project requirement. when do you ever have to do this?
function saveAsFile(data: Data) {
    //we know emails should be unique, otherwise the postgresdb wouldn't accept them
    const dataAsString = `name: ${data.firstName} ${data.lastName}\nemail: ${data.email}\nmessage: ${data.message}`
    const fileName = data.email?.replace(/\W/g, '')

    fs.writeFile(`contacts/${fileName}.txt`, dataAsString, (err: any) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('file written successfully')
            console.log(fs.readFileSync(`contacts/${fileName}.txt`, 'utf8'))
        }
    });
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
    const data = {firstName: firstName, lastName: lastName, email: email, message: message} as Data;
    saveAsFile(data);

    console.log('attempting to save to postgresdb', validatedFields.data)

    const client = await db.connect();
    let success = false;

    try {
        await client.sql`
            INSERT INTO contacts (firstname, lastname, email, message)
            VALUES (${firstName}, ${lastName}, ${email}, ${message});
        `;
        await client.end();
        success = true;
    } catch (error) {
        await client.end();
        return {
            message: 'Database Error: Failed to add Contact.'
        }
    } finally {
        if(success) {
            redirect('/thanks', RedirectType.push)
        } else {
            revalidatePath('/contact-us');
            redirect('/contact-us')
        }
    }
    ;
}