import ContactUsForm from '@/app/ui/contact-us-form'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Demo App',
};

export default function Page() {
    return (
        <div className='min-h-screen flex items-center justify-center dark:bg-blue-400'>
            <ContactUsForm />
        </div>
    )
}