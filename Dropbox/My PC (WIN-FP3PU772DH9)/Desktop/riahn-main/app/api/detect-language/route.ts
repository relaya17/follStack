import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      )
    }

    // זיהוי שפה פשוט (במקום אמיתי זה יהיה עם Google Language Detection API)
    const detectedLanguage = detectLanguage(text)

    return NextResponse.json({
      success: true,
      text,
      detectedLanguage,
      confidence: 0.9
    })

  } catch (error) {
    console.error('Language detection error:', error)
    return NextResponse.json(
      { error: 'Language detection failed' },
      { status: 500 }
    )
  }
}

function detectLanguage(text: string): string {
  // זיהוי עברית
  if (/[\u0590-\u05FF]/.test(text)) {
    return 'he'
  }
  
  // זיהוי ערבית
  if (/[\u0600-\u06FF]/.test(text)) {
    return 'ar'
  }
  
  // זיהוי אנגלית (ברירת מחדל)
  if (/[a-zA-Z]/.test(text)) {
    return 'en'
  }
  
  // ברירת מחדל
  return 'en'
}
