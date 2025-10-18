'use client'

import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const { t, currentLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-emerald-50/10 to-teal-50/15">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {t('contact.form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <Input 
                      type="text" 
                      placeholder={t('contact.form.namePlaceholder')}
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <Input 
                      type="email" 
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <Textarea 
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="bg-white/50 min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full h-12 text-base font-semibold">
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.form.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {t('contact.info.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">contact@languageconnect.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+972-50-123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">Tel Aviv, Israel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
