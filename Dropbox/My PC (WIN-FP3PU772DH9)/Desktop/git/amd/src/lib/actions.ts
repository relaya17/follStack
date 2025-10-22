'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import connectDB from './mongodb';
import Contact from '@/models/Contact';

export async function setLanguage(lang: 'en' | 'he') {
  (await cookies()).set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  redirect('/');
}

const ContactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(formData: z.infer<typeof ContactFormSchema>) {
    const validatedFields = ContactFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data.',
            success: false,
        };
    }
    
    try {
        await connectDB();
        
        const contact = new Contact({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            phone: validatedFields.data.phone,
            message: validatedFields.data.message,
        });
        
        await contact.save();
        
        return {
            message: 'Thank you for your message! We will get back to you soon.',
            success: true,
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            message: 'An error occurred while saving your message. Please try again.',
            success: false,
        };
    }
}