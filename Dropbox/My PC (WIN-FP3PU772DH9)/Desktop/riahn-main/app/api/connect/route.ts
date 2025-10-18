import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for connect page
    const connectData = {
      success: true,
      message: 'Connect API working',
      data: {
        onlineUsers: 42,
        availableLanguages: ['he', 'en', 'ar', 'es', 'fr'],
        features: [
          {
            id: 'video-call',
            name: 'Video Call',
            description: 'Connect with native speakers via video',
            available: true
          },
          {
            id: 'chat',
            name: 'Chat',
            description: 'Practice through text conversations',
            available: true
          },
          {
            id: 'voice-call',
            name: 'Voice Call',
            description: 'Practice pronunciation with voice calls',
            available: true
          }
        ]
      }
    }

    return NextResponse.json(connectData)
  } catch (error) {
    console.error('Connect API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to fetch connect data'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle connect requests (e.g., start a conversation)
    const { action, userId, language } = body

    if (action === 'start-conversation') {
      // Mock response for starting a conversation
      return NextResponse.json({
        success: true,
        message: 'Conversation started',
        conversationId: `conv_${Date.now()}`,
        partner: {
          id: userId,
          name: 'Mock User',
          language: language
        }
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Connect POST error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to process connect request'
      },
      { status: 500 }
    )
  }
}
