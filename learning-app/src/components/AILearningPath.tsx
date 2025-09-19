import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, ProgressBar, Chip, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  completed: boolean;
  type: 'theory' | 'practice' | 'project';
}

interface AILearningPathProps {
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  timeAvailable: number; // hours per week
}

const AILearningPath: React.FC<AILearningPathProps> = ({ 
  userLevel, 
  interests, 
  timeAvailable 
}) => {
  const [learningPath, setLearningPath] = useState<LearningStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generatePersonalizedPath();
  }, [userLevel, interests, timeAvailable]);

  const generatePersonalizedPath = async () => {
    setIsGenerating(true);
    
    // סימולציה של AI - במציאות תהיה קריאה ל-API
    setTimeout(() => {
      const path = createMockLearningPath();
      setLearningPath(path);
      setIsGenerating(false);
    }, 1500);
  };

  const createMockLearningPath = (): LearningStep[] => {
    const baseSteps: LearningStep[] = [
      {
        id: '1',
        title: 'JavaScript Basics',
        description: 'לימוד יסודות JavaScript - משתנים, פונקציות, לולאות',
        difficulty: 'beginner',
        estimatedTime: '2-3 שעות',
        completed: false,
        type: 'theory'
      },
      {
        id: '2',
        title: 'Arrays & Objects',
        description: 'עבודה עם מערכים ואובייקטים, שיטות מובנות',
        difficulty: 'beginner',
        estimatedTime: '3-4 שעות',
        completed: false,
        type: 'practice'
      },
      {
        id: '3',
        title: 'DOM Manipulation',
        description: 'שינוי תוכן דף HTML באמצעות JavaScript',
        difficulty: 'intermediate',
        estimatedTime: '4-5 שעות',
        completed: false,
        type: 'practice'
      },
      {
        id: '4',
        title: 'Event Handling',
        description: 'טיפול באירועים - קליקים, מקלדת, עכבר',
        difficulty: 'intermediate',
        estimatedTime: '3-4 שעות',
        completed: false,
        type: 'practice'
      },
      {
        id: '5',
        title: 'Async JavaScript',
        description: 'Promises, async/await, קריאות API',
        difficulty: 'advanced',
        estimatedTime: '5-6 שעות',
        completed: false,
        type: 'theory'
      },
      {
        id: '6',
        title: 'Mini Project',
        description: 'בניית אפליקציה קטנה - Todo List',
        difficulty: 'intermediate',
        estimatedTime: '6-8 שעות',
        completed: false,
        type: 'project'
      }
    ];

    // התאמה אישית לפי רמת המשתמש
    return baseSteps.filter(step => {
      if (userLevel === 'beginner') {
        return step.difficulty === 'beginner' || step.difficulty === 'intermediate';
      } else if (userLevel === 'intermediate') {
        return step.difficulty === 'intermediate' || step.difficulty === 'advanced';
      }
      return true;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return 'book';
      case 'practice': return 'code-slash';
      case 'project': return 'rocket';
      default: return 'help';
    }
  };

  const getProgressPercentage = () => {
    if (learningPath.length === 0) return 0;
    const completed = learningPath.filter(step => step.completed).length;
    return completed / learningPath.length;
  };

  const markStepCompleted = (stepId: string) => {
    setLearningPath(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const getEstimatedTotalTime = () => {
    return learningPath.reduce((total, step) => {
      const time = parseInt(step.estimatedTime.split('-')[0]);
      return total + time;
    }, 0);
  };

  if (isGenerating) {
    return (
      <Card style={styles.container}>
        <Card.Content style={styles.loadingContainer}>
          <Ionicons name="library" size={48} color="#1976d2" />
          <Title style={styles.loadingTitle}>יוצר מסלול למידה אישי...</Title>
          <Paragraph style={styles.loadingText}>
            AI מנתח את הרמה וההעדפות שלך
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.header}>
            <Ionicons name="trending-up" size={32} color="#1976d2" />
            <View style={styles.headerText}>
              <Title style={styles.headerTitle}>מסלול למידה אישי</Title>
              <Text style={styles.headerSubtitle}>
                מותאם לרמה: {userLevel} | זמן זמין: {timeAvailable} שעות/שבוע
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              התקדמות: {Math.round(getProgressPercentage() * 100)}%
            </Text>
            <ProgressBar 
              progress={getProgressPercentage()} 
              color="#1976d2" 
              style={styles.progressBar}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{learningPath.length}</Text>
              <Text style={styles.statLabel}>שלבים</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{getEstimatedTotalTime()}</Text>
              <Text style={styles.statLabel}>שעות</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.ceil(getEstimatedTotalTime() / timeAvailable)}
              </Text>
              <Text style={styles.statLabel}>שבועות</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {learningPath.map((step, index) => (
        <Card 
          key={step.id} 
          style={[
            styles.stepCard,
            step.completed && styles.completedCard
          ]}
        >
          <Card.Content>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepTitleRow}>
                  <Title style={styles.stepTitle}>{step.title}</Title>
                  <Chip 
                    style={[styles.difficultyChip, { backgroundColor: getDifficultyColor(step.difficulty) }]}
                    textStyle={styles.difficultyText}
                  >
                    {step.difficulty}
                  </Chip>
                </View>
                <Paragraph style={styles.stepDescription}>
                  {step.description}
                </Paragraph>
                <View style={styles.stepMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name={getTypeIcon(step.type) as any} size={16} color="#666" />
                    <Text style={styles.metaText}>{step.type}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time" size={16} color="#666" />
                    <Text style={styles.metaText}>{step.estimatedTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            {!step.completed && (
              <Button
                mode="contained"
                onPress={() => markStepCompleted(step.id)}
                style={styles.completeButton}
                icon="check"
              >
                סיים שלב
              </Button>
            )}

            {step.completed && (
              <View style={styles.completedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#4caf50" />
                <Text style={styles.completedText}>הושלם!</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.recommendationsCard}>
        <Card.Content>
          <Title style={styles.recommendationsTitle}>המלצות AI</Title>
          <View style={styles.recommendationItem}>
            <Ionicons name="bulb" size={20} color="#ff9800" />
            <Text style={styles.recommendationText}>
              מומלץ להתחיל עם 30 דקות ביום ולהגביר בהדרגה
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="bookmark" size={20} color="#ff9800" />
            <Text style={styles.recommendationText}>
              שמור על עקביות - עדיף 20 דקות כל יום מאשר 3 שעות פעם בשבוע
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="people" size={20} color="#ff9800" />
            <Text style={styles.recommendationText}>
              הצטרף לקהילת מפתחים לקבלת עזרה ותמיכה
            </Text>
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  stepCard: {
    margin: 16,
    marginTop: 8,
  },
  completedCard: {
    backgroundColor: '#e8f5e8',
  },
  stepHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  difficultyChip: {
    height: 24,
  },
  difficultyText: {
    color: 'white',
    fontSize: 10,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  stepMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  completeButton: {
    marginTop: 8,
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  completedText: {
    marginLeft: 8,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  recommendationsCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#fff3e0',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
});

export default AILearningPath;
