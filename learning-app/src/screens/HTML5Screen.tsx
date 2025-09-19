import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const HTML5Screen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const semanticElements = [
    { tag: '<header>', description: 'כותרת הדף או קטע', purpose: 'תוכן פתיחה' },
    { tag: '<nav>', description: 'קישורי ניווט עיקריים', purpose: 'ניווט באתר' },
    { tag: '<main>', description: 'התוכן העיקרי של הדף', purpose: 'תוכן מרכזי' },
    { tag: '<section>', description: 'קטע תמטי בתוכן', purpose: 'ארגון תוכן' },
    { tag: '<article>', description: 'תוכן עצמאי (מאמר, פוסט)', purpose: 'תוכן עצמאי' },
    { tag: '<aside>', description: 'תוכן צדדי (sidebar)', purpose: 'תוכן משני' },
    { tag: '<footer>', description: 'כותרת תחתונה', purpose: 'מידע על הדף' },
    { tag: '<figure>', description: 'תוכן ויזואלי עם כיתוב', purpose: 'תמונות/גרפיקות' },
    { tag: '<figcaption>', description: 'כיתוב לתוכן ויזואלי', purpose: 'הסבר לתמונה' },
    { tag: '<time>', description: 'תאריך או זמן', purpose: 'מידע זמן' },
    { tag: '<address>', description: 'פרטי קשר', purpose: 'מידע קשר' },
  ];

  const htmlStructure = `<!doctype html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>כותרת הדף</title>
</head>
<body>
    <header>
        <h1>שם האתר</h1>
        <nav>
            <ul>
                <li><a href="#home">בית</a></li>
                <li><a href="#about">אודות</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>כותרת המאמר</h2>
                <time datetime="2023-10-15">15 באוקטובר 2023</time>
            </header>
            
            <section>
                <h3>קטע ראשון</h3>
                <p>תוכן הקטע...</p>
            </section>
        </article>
    </main>

    <aside>
        <h3>מאמרים קשורים</h3>
        <ul>
            <li><a href="#article1">מאמר קשור</a></li>
        </ul>
    </aside>

    <footer>
        <p>&copy; 2023 שם החברה</p>
        <address>
            צרו קשר: <a href="mailto:info@example.com">info@example.com</a>
        </address>
    </footer>
</body>
</html>`;

  const benefits = [
    'נגישות משופרת - קוראי מסך יכולים לנווט טוב יותר',
    'SEO טוב יותר - מנועי חיפוש מבינים את המבנה',
    'קוד ברור יותר - קל יותר לתחזוקה',
    'עתידיות - תמיכה טובה יותר בכלים עתידיים',
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>HTML5 סמנטי</Title>
        <Paragraph style={styles.subtitle}>
          אלמנטים סמנטיים ומבנה נכון של דף
        </Paragraph>
      </Surface>

      {/* מבוא */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#e34f26" />
            <Title style={styles.sectionTitle}>מה זה HTML5 סמנטי?</Title>
          </View>
          <Paragraph style={styles.description}>
            HTML5 הביא איתו אלמנטים סמנטיים חדשים שמספקים משמעות ומבנה טוב יותר לתוכן הדף. 
            האלמנטים הללו לא רק משפרים את הקריאות של הקוד, אלא גם עוזרים לכלי נגישות, 
            מנועי חיפוש וכלים אחרים להבין טוב יותר את המבנה והתוכן.
          </Paragraph>
        </Card.Content>
      </Card>

      {/* אלמנטים סמנטיים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#e34f26" />
            <Title style={styles.sectionTitle}>אלמנטים סמנטיים</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('elements')}
              icon={expandedSection === 'elements' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'elements' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'elements' && (
            <View style={styles.elementsGrid}>
              {semanticElements.map((element, index) => (
                <Card key={index} style={styles.elementCard}>
                  <Card.Content>
                    <Text style={styles.elementTag}>{element.tag}</Text>
                    <Text style={styles.elementDescription}>{element.description}</Text>
                    <Chip style={styles.purposeChip} textStyle={styles.purposeChipText}>
                      {element.purpose}
                    </Chip>
                  </Card.Content>
                </Card>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      {/* מבנה דף מלא */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={24} color="#e34f26" />
            <Title style={styles.sectionTitle}>מבנה דף מלא</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('structure')}
              icon={expandedSection === 'structure' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'structure' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'structure' && (
            <Surface style={styles.codeBlock} elevation={1}>
              <Text style={styles.codeText}>{htmlStructure}</Text>
            </Surface>
          )}
        </Card.Content>
      </Card>

      {/* יתרונות */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#4caf50" />
            <Title style={styles.sectionTitle}>יתרונות HTML5 סמנטי</Title>
          </View>
          
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark" size={16} color="#4caf50" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
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
    margin: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#e34f26',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffebee',
    textAlign: 'center',
  },
  section: {
    margin: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  elementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  elementCard: {
    width: '48%',
    marginBottom: 8,
  },
  elementTag: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#e34f26',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  elementDescription: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  purposeChip: {
    backgroundColor: '#ffebee',
  },
  purposeChipText: {
    color: '#e34f26',
    fontSize: 10,
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    color: '#333',
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default HTML5Screen;
