import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, fromLanguage, toLanguage } = await request.json()

    if (!text || !fromLanguage || !toLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text, fromLanguage, toLanguage' },
        { status: 400 }
      )
    }

    // אם השפות זהות, לא צריך לתרגם
    if (fromLanguage === toLanguage) {
      return NextResponse.json({
        success: true,
        originalText: text,
        translatedText: text,
        fromLanguage,
        toLanguage,
        confidence: 1.0
      })
    }

    // תרגום פשוט (במקום אמיתי זה יהיה עם Google Translate API)
    const translations: Record<string, Record<string, string>> = {
      'he': {
        'en': translateHebrewToEnglish(text),
        'ar': translateHebrewToArabic(text)
      },
      'en': {
        'he': translateEnglishToHebrew(text),
        'ar': translateEnglishToArabic(text)
      },
      'ar': {
        'he': translateArabicToHebrew(text),
        'en': translateArabicToEnglish(text)
      }
    }

    const translatedText = translations[fromLanguage]?.[toLanguage] || text

    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText,
      fromLanguage,
      toLanguage,
      confidence: 0.9
    })

  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}

// פונקציות תרגום פשוטות (במקום אמיתי זה יהיה עם Google Translate API)
function translateHebrewToEnglish(text: string): string {
  const translations: Record<string, string> = {
    'שלום': 'Hello',
    'איך אתה?': 'How are you?',
    'תודה': 'Thank you',
    'בבקשה': 'Please',
    'סליחה': 'Sorry',
    'כן': 'Yes',
    'לא': 'No',
    'מה השעה?': 'What time is it?',
    'איפה אתה?': 'Where are you?',
    'אני אוהב אותך': 'I love you'
  }
  
  return translations[text] || `[Translated from Hebrew: ${text}]`
}

function translateEnglishToHebrew(text: string): string {
  const translations: Record<string, string> = {
    'Hello': 'שלום',
    'How are you?': 'איך אתה?',
    'Thank you': 'תודה',
    'Please': 'בבקשה',
    'Sorry': 'סליחה',
    'Yes': 'כן',
    'No': 'לא',
    'What time is it?': 'מה השעה?',
    'Where are you?': 'איפה אתה?',
    'I love you': 'אני אוהב אותך'
  }
  
  return translations[text] || `[מתורגם מאנגלית: ${text}]`
}

function translateHebrewToArabic(text: string): string {
  const translations: Record<string, string> = {
    'שלום': 'مرحبا',
    'איך אתה?': 'كيف حالك؟',
    'תודה': 'شكرا',
    'בבקשה': 'من فضلك',
    'סליחה': 'آسف',
    'כן': 'نعم',
    'לא': 'لا'
  }
  
  return translations[text] || `[مترجم من العبرية: ${text}]`
}

function translateEnglishToArabic(text: string): string {
  const translations: Record<string, string> = {
    'Hello': 'مرحبا',
    'How are you?': 'كيف حالك؟',
    'Thank you': 'شكرا',
    'Please': 'من فضلك',
    'Sorry': 'آسف',
    'Yes': 'نعم',
    'No': 'لا'
  }
  
  return translations[text] || `[مترجم من الإنجليزية: ${text}]`
}

function translateArabicToHebrew(text: string): string {
  const translations: Record<string, string> = {
    'مرحبا': 'שלום',
    'كيف حالك؟': 'איך אתה?',
    'شكرا': 'תודה',
    'من فضلك': 'בבקשה',
    'آسف': 'סליחה',
    'نعم': 'כן',
    'لا': 'לא'
  }
  
  return translations[text] || `[מתורגם מערבית: ${text}]`
}

function translateArabicToEnglish(text: string): string {
  const translations: Record<string, string> = {
    'مرحبا': 'Hello',
    'كيف حالك؟': 'How are you?',
    'شكرا': 'Thank you',
    'من فضلك': 'Please',
    'آسف': 'Sorry',
    'نعم': 'Yes',
    'لا': 'No'
  }
  
  return translations[text] || `[Translated from Arabic: ${text}]`
}
