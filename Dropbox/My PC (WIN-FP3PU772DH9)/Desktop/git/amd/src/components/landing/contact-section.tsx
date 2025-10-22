'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import type { translations as T } from '@/lib/translations';

type Translations = typeof T.he;
type FormData = z.infer<typeof ContactFormSchema>;

interface ContactSectionProps {
  t: Translations;
}

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export function ContactSection({ t }: ContactSectionProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = await submitContactForm(data);
    
    if (result.success) {
      toast({
        title: t.contact.success,
        description: t.contact.success, // Using translation key for consistency
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: t.contact.error,
        description: result.message,
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t.contact.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">{t.contact.subtitle}</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.contact.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.email}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.contact.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.phone}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.contact.phone} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.message}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t.contact.message} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                size={"lg" as const}
                disabled={form.formState.isSubmitting} 
                className="w-full"
              >
                {form.formState.isSubmitting ? t.contact.submitting : t.contact.submit}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}