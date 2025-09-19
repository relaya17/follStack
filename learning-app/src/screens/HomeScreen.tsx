import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const features = [
    {
      title: 'JavaScript בסיסי',
      description: 'טיפוסי נתונים, משתנים, פונקציות ועוד',
      icon: 'logo-javascript',
      color: '#f7df1e',
      screen: 'JavaScript',
    },
    {
      title: 'HTML5 סמנטי',
      description: 'אלמנטים סמנטיים ומבנה נכון',
      icon: 'logo-html5',
      color: '#e34f26',
      screen: 'HTML5',
    },
    {
      title: 'CSS3 מתקדם',
      description: 'סלקטורים, אנימציות, Material Design',
      icon: 'color-palette',
      color: '#1572b6',
      screen: 'CSS3',
    },
    {
      title: 'חידון טריוויה',
      description: '50 שאלות על כל הנושאים',
      icon: 'help-circle',
      color: '#ff9800',
      screen: 'Quiz',
    },
    {
      title: 'משחק זיכרון',
      description: 'משחק אינטראקטיבי לחזרה על החומר',
      icon: 'brain',
      color: '#9c27b0',
      screen: 'Memory',
    },
    {
      title: 'AI Hub',
      description: 'עוזר AI חכם לכל הנושאים',
      icon: 'sparkles',
      color: '#9c27b0',
      screen: 'AI Hub',
    },
    {
      title: 'React Router',
      description: 'ניהול נתיבים וניווט באפליקציות React',
      icon: 'git-network',
      color: '#61dafb',
      screen: 'React Router',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>חוברת לימוד מקיפה</Title>
        <Paragraph style={styles.subtitle}>
          JavaScript, HTML5, CSS3 - מדריך מלא עם דוגמאות ותרגילים
        </Paragraph>
        <View style={styles.quickActions}>
          <Button
            mode="contained"
            onPress={() => (navigation as any).jumpTo('JavaScript')}
            style={styles.quickButton}
            icon="logo-javascript"
          >
            JavaScript
          </Button>
          <Button
            mode="contained"
            onPress={() => (navigation as any).jumpTo('AI Hub')}
            style={styles.quickButton}
            icon="sparkles"
          >
            AI Hub
          </Button>
          <Button
            mode="contained"
            onPress={() => (navigation as any).jumpTo('Quiz')}
            style={styles.quickButton}
            icon="help-circle"
          >
            חידון
          </Button>
        </View>
      </Surface>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Card key={index} style={[styles.featureCard, { borderLeftColor: feature.color }]}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={feature.icon as any} 
                  size={32} 
                  color={feature.color} 
                />
              </View>
              <View style={styles.textContainer}>
                <Title style={styles.cardTitle}>{feature.title}</Title>
                <Paragraph style={styles.cardDescription}>
                  {feature.description}
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={() => (navigation as any).jumpTo(feature.screen)}
                  style={[styles.enterButton, { backgroundColor: feature.color }]}
                  labelStyle={styles.enterButtonLabel}
                  icon="arrow-forward"
                >
                  כניסה לנושא
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Surface style={styles.statsContainer} elevation={1}>
        <Title style={styles.statsTitle}>סטטיסטיקות</Title>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>פרקים</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50</Text>
            <Text style={styles.statLabel}>שאלות טריוויה</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20+</Text>
            <Text style={styles.statLabel}>תרגילים</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>משחקים</Text>
          </View>
        </View>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#1976d2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  featuresContainer: {
    padding: 16,
  },
  featureCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  enterButton: {
    marginTop: 8,
    borderRadius: 20,
  },
  enterButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
