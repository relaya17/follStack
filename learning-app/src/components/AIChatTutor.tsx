import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Surface, Text, Avatar, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'code' | 'explanation';
}

interface AIChatTutorProps {
  subject: 'javascript' | 'html' | 'css' | 'general';
}

const getSubjectName = (subj: string) => {
  switch (subj) {
    case 'javascript': return 'JavaScript';
    case 'html': return 'HTML';
    case 'css': return 'CSS';
    default: return 'תכנות';
  }
};

const AIChatTutor: React.FC<AIChatTutorProps> = ({ subject }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `שלום! אני המורה הפרטי שלך ל-${getSubjectName(subject)}. איך אני יכול לעזור לך היום?`,
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };


  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // סימולציה של AI - במציאות תהיה קריאה ל-API
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, subject);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, subj: string) => {
    const input = userInput.toLowerCase();

    // תגובות מותאמות לנושא
    if (subj === 'javascript') {
      if (input.includes('מערך') || input.includes('array')) {
        return {
          text: `מערכים ב-JavaScript הם מבני נתונים חשובים! הנה דוגמה:

\`\`\`javascript
// יצירת מערך
const fruits = ['תפוח', 'בננה', 'תפוז'];

// הוספת אלמנט
fruits.push('ענבים');

// איטרציה על המערך
fruits.forEach(fruit => {
    console.log(fruit);
});

// שיטות מובנות
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
\`\`\`

האם תרצה שאסביר על שיטה ספציפית?`,
          type: 'code' as const
        };
      }

      if (input.includes('פונקציה') || input.includes('function')) {
        return {
          text: `פונקציות הן הבסיס של JavaScript! הנה הסבר:

**הגדרת פונקציה:**
\`\`\`javascript
// פונקציה רגילה
function greet(name) {
    return "שלום " + name;
}

// Arrow function
const greetArrow = (name) => {
    return "שלום " + name;
}

// פונקציה עם פרמטרים דיפולטיים
function calculate(a, b = 0) {
    return a + b;
}
\`\`\`

**שימוש בפונקציות:**
- פונקציות מחזירות ערכים
- יכולות לקבל פרמטרים
- יכולות להיות מועברות כערכים
- יכולות להיות מוגדרות בתוך פונקציות אחרות

איזה חלק מהפונקציות מעניין אותך?`,
          type: 'explanation' as const
        };
      }
    }

    if (subj === 'html') {
      if (input.includes('סמנטי') || input.includes('semantic')) {
        return {
          text: `HTML5 סמנטי הוא חשוב מאוד! הנה הסבר:

**אלמנטים סמנטיים:**
\`\`\`html
<header>
    <h1>כותרת האתר</h1>
    <nav>
        <ul>
            <li><a href="#home">בית</a></li>
            <li><a href="#about">אודות</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>כותרת המאמר</h2>
        <p>תוכן המאמר...</p>
    </article>
</main>

<aside>
    <h3>מידע נוסף</h3>
    <p>תוכן צדדי...</p>
</aside>

<footer>
    <p>&copy; 2024 האתר שלי</p>
</footer>
\`\`\`

**יתרונות:**
- נגישות טובה יותר
- SEO משופר
- קוד ברור יותר
- תמיכה בכלי נגישות

האם תרצה שאסביר על אלמנט ספציפי?`,
          type: 'code' as const
        };
      }
    }

    if (subj === 'css') {
      if (input.includes('flexbox') || input.includes('flex')) {
        return {
          text: `Flexbox הוא כלי עוצמתי לעיצוב! הנה הסבר:

**Flexbox Container:**
\`\`\`css
.container {
    display: flex;
    flex-direction: row; /* או column */
    justify-content: center; /* יישור אופקי */
    align-items: center; /* יישור אנכי */
    gap: 20px; /* רווח בין אלמנטים */
}
\`\`\`

**Flexbox Items:**
\`\`\`css
.item {
    flex: 1; /* גדל לפי הצורך */
    flex-grow: 2; /* גדל פי 2 */
    flex-shrink: 0; /* לא מתכווץ */
    flex-basis: 200px; /* גודל בסיס */
}
\`\`\`

**דוגמה מעשית:**
\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.navbar .logo {
    flex: 0 0 auto;
}

.navbar .menu {
    flex: 1;
    display: flex;
    justify-content: center;
}
\`\`\`

איזה חלק מ-Flexbox מעניין אותך?`,
          type: 'code' as const
        };
      }
    }

    // תגובות כלליות
    if (input.includes('שלום') || input.includes('היי')) {
      return {
        text: 'שלום! אני כאן לעזור לך ללמוד. איזה נושא מעניין אותך?',
        type: 'text' as const
      };
    }

    if (input.includes('תודה')) {
      return {
        text: 'בכיף! אני תמיד כאן לעזור. יש עוד שאלות?',
        type: 'text' as const
      };
    }

    if (input.includes('קשה') || input.includes('לא מבין')) {
      return {
        text: 'זה בסדר! למידה לוקחת זמן. בואו נפרק את זה לחלקים קטנים יותר. איזה חלק בדיוק לא ברור?',
        type: 'text' as const
      };
    }

    // תגובה ברירת מחדל
    return {
      text: `זה נושא מעניין! בואו נעמיק בו. האם תוכל לפרט יותר על מה שאתה מחפש? אני יכול לעזור עם דוגמאות קוד, הסברים או תרגילים מעשיים.`,
      type: 'text' as const
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message: Message) => {
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          message.isUser ? styles.userMessage : styles.aiMessage
        ]}
      >
        <View style={styles.messageContent}>
          {!message.isUser && (
            <Avatar.Icon
              size={32}
              icon="robot"
              style={styles.avatar}
            />
          )}
          
          <Surface
            style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble
            ]}
            elevation={1}
          >
            {message.type === 'code' ? (
              <View>
                <Text style={styles.messageText}>
                  {message.text.split('```')[0]}
                </Text>
                <Surface style={styles.codeBlock} elevation={2}>
                  <Text style={styles.codeText}>
                    {message.text.split('```')[1]}
                  </Text>
                </Surface>
                {message.text.split('```')[2] && (
                  <Text style={styles.messageText}>
                    {message.text.split('```')[2]}
                  </Text>
                )}
              </View>
            ) : (
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userText : styles.aiText
              ]}>
                {message.text}
              </Text>
            )}
            
            <Text style={styles.timestamp}>
              {formatTime(message.timestamp)}
            </Text>
          </Surface>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Card style={styles.chatContainer}>
        <Card.Content style={styles.chatHeader}>
          <View style={styles.headerContent}>
            <Avatar.Icon
              size={40}
              icon="robot"
              style={styles.headerAvatar}
            />
            <View>
              <Title style={styles.headerTitle}>מורה AI</Title>
              <Text style={styles.headerSubtitle}>
                מומחה ל-{getSubjectName(subject)}
              </Text>
            </View>
          </View>
        </Card.Content>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(renderMessage)}
          
          {isTyping && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.messageContent}>
                <Avatar.Icon
                  size={32}
                  icon="robot"
                  style={styles.avatar}
                />
                <Surface style={[styles.messageBubble, styles.aiBubble]} elevation={1}>
                  <View style={styles.typingIndicator}>
                    <Text style={styles.typingText}>כותב...</Text>
                    <View style={styles.typingDots}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                  </View>
                </Surface>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="שאל שאלה..."
            multiline
            style={styles.textInput}
            mode="outlined"
            dense
          />
          <IconButton
            icon="send"
            size={24}
            onPress={sendMessage}
            disabled={!inputText.trim()}
            style={styles.sendButton}
          />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  chatContainer: {
    flex: 1,
    margin: 16,
  },
  chatHeader: {
    backgroundColor: '#1976d2',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    backgroundColor: '#fff',
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e3f2fd',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    flexDirection: 'row',
    maxWidth: '80%',
    alignItems: 'flex-end',
  },
  avatar: {
    backgroundColor: '#1976d2',
    marginRight: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#1976d2',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#1976d2',
  },
});

export default AIChatTutor;
