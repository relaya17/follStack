import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { Title, Paragraph, Surface, Button, Text, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const BookletScreen = () => {
  const openWebBooklet = () => {
    Linking.openURL('http://localhost:8082'); // או הכתובת של החוברת המקוונת
  };

  const sections = [
    {
      title: 'JavaScript בסיסי',
      description: 'טיפוסי נתונים, המרות, משתנים ולולאות',
      icon: 'logo-javascript',
      color: '#f7df1e',
    },
    {
      title: 'המרת נתונים',
      description: 'parseInt, parseFloat, String, Boolean',
      icon: 'swap-horizontal',
      color: '#4caf50',
    },
    {
      title: 'מערכים - CRUD ואיטרציות',
      description: 'יצירה, עדכון, מחיקה ושיטות מובנות',
      icon: 'list',
      color: '#2196f3',
    },
    {
      title: 'פונקציות',
      description: 'הגדרה, פרמטרים, scope ו-closures',
      icon: 'code-slash',
      color: '#ff9800',
    },
    {
      title: 'אובייקטים ליטרליים',
      description: 'יצירה, גישה, שינוי ואיטרציה',
      icon: 'cube',
      color: '#9c27b0',
    },
    {
      title: 'אלגוריתמים',
      description: 'FizzBuzz, Reverse String, Find Max',
      icon: 'calculator',
      color: '#f44336',
    },
    {
      title: 'HTML5 סמנטי',
      description: 'header, nav, section, article, aside, footer',
      icon: 'logo-html5',
      color: '#e34f26',
    },
    {
      title: 'CSS3 מתקדם',
      description: 'סלקטורים, אנימציות, Material Design',
      icon: 'color-palette',
      color: '#1572b6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.headerTitle}>חוברת לימוד מקיפה</Title>
        <Paragraph style={styles.headerSubtitle}>
          JavaScript, HTML5, CSS3 - מדריך מלא עם דוגמאות קוד, תרגילים ומשחקים
        </Paragraph>
        <Button 
          mode="contained" 
          onPress={openWebBooklet}
          style={styles.webButton}
          icon="open-in-browser"
        >
          פתח חוברת מקוונת
        </Button>
      </Surface>

      <Surface style={styles.tocContainer} elevation={1}>
        <Title style={styles.tocMainTitle}>תוכן עניינים</Title>
        {sections.map((section, index) => (
          <View key={index} style={styles.tocItem}>
            <View style={styles.tocItemContent}>
              <Ionicons 
                name={section.icon as any} 
                size={24} 
                color={section.color} 
                style={styles.tocIcon}
              />
              <View style={styles.tocText}>
                <Text style={styles.tocNumber}>{index + 1}.</Text>
                <Text style={styles.tocTitle}>{section.title}</Text>
              </View>
            </View>
            <Paragraph style={styles.tocDescription}>
              {section.description}
            </Paragraph>
            {index < sections.length - 1 && <Divider style={styles.divider} />}
          </View>
        ))}
      </Surface>

      <Surface style={styles.featuresContainer} elevation={1}>
        <Title style={styles.featuresTitle}>מה תמצאו בחוברת?</Title>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="code-slash" size={20} color="#4caf50" />
            <Text style={styles.featureText}>דוגמאות קוד מפורטות</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="school" size={20} color="#2196f3" />
            <Text style={styles.featureText}>תרגילים מעשיים</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="help-circle" size={20} color="#ff9800" />
            <Text style={styles.featureText}>חידון טריוויה (50 שאלות)</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="library" size={20} color="#9c27b0" />
            <Text style={styles.featureText}>משחק זיכרון אינטראקטיבי</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="print" size={20} color="#f44336" />
            <Text style={styles.featureText}>גרסה להדפסה (PDF)</Text>
          </View>
        </View>
      </Surface>

      <Surface style={styles.statsContainer} elevation={1}>
        <Title style={styles.statsTitle}>סטטיסטיקות החוברת</Title>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>פרקים עיקריים</Text>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  webButton: {
    backgroundColor: '#ffffff',
    color: '#1976d2',
  },
  tocContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  tocMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  tocItem: {
    marginBottom: 12,
  },
  tocItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tocIcon: {
    marginRight: 12,
  },
  tocText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tocNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#666',
  },
  tocTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  tocDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 36,
    lineHeight: 20,
  },
  divider: {
    marginTop: 12,
    backgroundColor: '#e0e0e0',
  },
  featuresContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  statsContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
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
    textAlign: 'center',
  },
});

export default BookletScreen;
