import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, Chip, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AICodeAssistant from '../components/AICodeAssistant';
import AILearningPath from '../components/AILearningPath';
import AICodeReviewer from '../components/AICodeReviewer';
import AIChatTutor from '../components/AIChatTutor';

const AIHubScreen = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const aiTools = [
    {
      id: 'code-assistant',
      title: 'AI Code Assistant',
      description: 'צור קוד אוטומטית לפי תיאור טקסטואלי',
      icon: 'auto-fix',
      color: '#ff6b6b',
      features: ['יצירת קוד JavaScript', 'תמיכה ב-HTML/CSS', 'דוגמאות מעשיות']
    },
    {
      id: 'learning-path',
      title: 'AI Learning Path',
      description: 'מסלול למידה אישי מותאם לרמה שלך',
      icon: 'trending-up',
      color: '#4caf50',
      features: ['התאמה אישית', 'מעקב התקדמות', 'המלצות חכמות']
    },
    {
      id: 'code-reviewer',
      title: 'AI Code Reviewer',
      description: 'בדיקת קוד, מציאת שגיאות והצעות שיפור',
      icon: 'bug',
      color: '#ff9800',
      features: ['זיהוי שגיאות', 'הצעות שיפור', 'תיקונים אוטומטיים']
    },
    {
      id: 'chat-tutor',
      title: 'AI Chat Tutor',
      description: 'מורה פרטי AI לעזרה אישית',
      icon: 'chatbubbles',
      color: '#2196f3',
      features: ['שאלות ותשובות', 'הסברים מפורטים', 'דוגמאות קוד']
    }
  ];

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'code-assistant':
        return (
          <AICodeAssistant 
            onCodeGenerated={(code, language) => {
              console.log('Generated code:', code, language);
            }}
          />
        );
      case 'learning-path':
        return (
          <AILearningPath 
            userLevel="intermediate"
            interests={['javascript', 'react', 'css']}
            timeAvailable={10}
          />
        );
      case 'code-reviewer':
        return (
          <AICodeReviewer 
            onIssueFound={(issues) => {
              console.log('Found issues:', issues);
            }}
          />
        );
      case 'chat-tutor':
        return (
          <AIChatTutor 
            subject="javascript"
          />
        );
      default:
        return null;
    }
  };

  if (activeTool) {
    return (
      <View style={styles.container}>
        <Surface style={styles.header} elevation={2}>
          <View style={styles.headerContent}>
            <IconButton
              icon="arrow-back"
              size={24}
              onPress={() => setActiveTool(null)}
            />
            <Title style={styles.headerTitle}>
              {aiTools.find(tool => tool.id === activeTool)?.title}
            </Title>
          </View>
        </Surface>
        {renderActiveTool()}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.heroSection} elevation={4}>
        <View style={styles.heroContent}>
          <Ionicons name="sparkles" size={64} color="#1976d2" />
          <Title style={styles.heroTitle}>AI Learning Hub</Title>
          <Paragraph style={styles.heroSubtitle}>
            כלי AI מתקדמים ללימוד תכנות - עוזרים חכמים שיעזרו לך ללמוד מהר יותר
          </Paragraph>
        </View>
      </Surface>

      <View style={styles.toolsGrid}>
        {aiTools.map((tool) => (
          <Card 
            key={tool.id} 
            style={styles.toolCard}
            onPress={() => setActiveTool(tool.id)}
          >
            <Card.Content>
              <View style={styles.toolHeader}>
                <Surface 
                  style={[styles.toolIcon, { backgroundColor: tool.color }]} 
                  elevation={2}
                >
                  <Ionicons name={tool.icon as any} size={32} color="#fff" />
                </Surface>
                <View style={styles.toolInfo}>
                  <Title style={styles.toolTitle}>{tool.title}</Title>
                  <Paragraph style={styles.toolDescription}>
                    {tool.description}
                  </Paragraph>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {tool.features.map((feature, index) => (
                  <Chip 
                    key={index}
                    style={styles.featureChip}
                    textStyle={styles.featureText}
                  >
                    {feature}
                  </Chip>
                ))}
              </View>

              <Button
                mode="contained"
                style={[styles.toolButton, { backgroundColor: tool.color }]}
                onPress={() => setActiveTool(tool.id)}
              >
                התחל להשתמש
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title style={styles.statsTitle}>סטטיסטיקות AI</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="code-slash" size={24} color="#ff6b6b" />
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>שורות קוד שנוצרו</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bug" size={24} color="#ff9800" />
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>שגיאות שתוקנו</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubbles" size={24} color="#2196f3" />
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>שאלות שנענו</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={24} color="#4caf50" />
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>מסלולי למידה</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.futureCard}>
        <Card.Content>
          <Title style={styles.futureTitle}>מה צפוי בעתיד?</Title>
          <View style={styles.futureFeatures}>
            <View style={styles.futureItem}>
              <Ionicons name="eye" size={20} color="#9c27b0" />
              <Text style={styles.futureText}>זיהוי קוד באמצעות מצלמה</Text>
            </View>
            <View style={styles.futureItem}>
              <Ionicons name="mic" size={20} color="#9c27b0" />
              <Text style={styles.futureText}>יצירת קוד באמצעות קול</Text>
            </View>
            <View style={styles.futureItem}>
              <Ionicons name="library" size={20} color="#9c27b0" />
              <Text style={styles.futureText}>למידה מותאמת אישית מתקדמת</Text>
            </View>
            <View style={styles.futureItem}>
              <Ionicons name="people" size={20} color="#9c27b0" />
              <Text style={styles.futureText}>שיתוף פעולה עם מפתחים אחרים</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1976d2',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroSection: {
    margin: 16,
    padding: 32,
    borderRadius: 16,
    backgroundColor: '#1976d2',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#e3f2fd',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  toolsGrid: {
    padding: 16,
  },
  toolCard: {
    marginBottom: 16,
    elevation: 2,
  },
  toolHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toolIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureChip: {
    margin: 2,
    backgroundColor: '#f0f0f0',
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  toolButton: {
    borderRadius: 8,
  },
  statsCard: {
    margin: 16,
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  futureCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#f3e5f5',
  },
  futureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  futureFeatures: {
    marginLeft: 8,
  },
  futureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  futureText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
});

export default AIHubScreen;
