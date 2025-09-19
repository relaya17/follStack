import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const CSS3Screen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const selectors = [
    { selector: 'parent > child', description: 'ילד ישיר', example: 'ul > li' },
    { selector: 'element1 + element2', description: 'אח סמוך', example: 'h2 + p' },
    { selector: 'element1 ~ element2', description: 'אח כללי', example: 'h2 ~ p' },
    { selector: '[attribute]', description: 'תכונה בסיסי', example: '[title]' },
    { selector: '[attribute="value"]', description: 'תכונה עם ערך', example: '[type="email"]' },
    { selector: '[attribute^="value"]', description: 'מתחיל ב...', example: '[href^="https"]' },
    { selector: '[attribute$="value"]', description: 'מסתיים ב...', example: '[href$=".pdf"]' },
    { selector: '[attribute*="value"]', description: 'מכיל...', example: '[src*="thumb"]' },
  ];

  const css3Features = [
    { name: 'border-radius', description: 'פינות מעוגלות', example: 'border-radius: 8px;' },
    { name: 'box-shadow', description: 'צלליות', example: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);' },
    { name: 'text-shadow', description: 'צל טקסט', example: 'text-shadow: 1px 1px 2px rgba(0,0,0,0.5);' },
    { name: 'linear-gradient', description: 'מעבר ליניארי', example: 'background: linear-gradient(45deg, #ff7e5f, #feb47b);' },
    { name: 'radial-gradient', description: 'מעבר רדיאלי', example: 'background: radial-gradient(circle, #ff7e5f, #feb47b);' },
    { name: 'transform', description: 'טרנספורמציות', example: 'transform: rotate(45deg) scale(1.2);' },
    { name: 'transition', description: 'מעברים חלקים', example: 'transition: all 0.3s ease;' },
    { name: 'animation', description: 'אנימציות', example: '@keyframes fadeIn { from { opacity: 0; } }' },
  ];

  const materialDesignExample = `/* Material Design Variables */
:root {
  --md-primary: #1976d2;
  --md-primary-dark: #1565c0;
  --md-elevation-1: 0 1px 3px rgba(0,0,0,0.12);
  --md-elevation-2: 0 3px 6px rgba(0,0,0,0.16);
  --md-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Material Design Card */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--md-elevation-1);
  transition: var(--md-transition);
}

.card:hover {
  box-shadow: var(--md-elevation-2);
  transform: translateY(-1px);
}

/* Material Design Button */
.button {
  background: var(--md-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--md-elevation-2);
  transition: var(--md-transition);
}

.button:hover {
  background: var(--md-primary-dark);
  box-shadow: var(--md-elevation-4);
}`;

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>CSS3 מתקדם</Title>
        <Paragraph style={styles.subtitle}>
          סלקטורים מתקדמים, תכונות חדשות ו-Material Design
        </Paragraph>
      </Surface>

      {/* מבוא */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#1572b6" />
            <Title style={styles.sectionTitle}>מה זה CSS3?</Title>
          </View>
          <Paragraph style={styles.description}>
            CSS3 הביא איתו סלקטורים חדשים ומתקדמים המאפשרים בחירה מדויקת יותר של אלמנטים בדף, 
            יחד עם תכונות חדשות לאנימציות, מעברי צבע, טרנספורמציות ועוד.
          </Paragraph>
        </Card.Content>
      </Card>

      {/* סלקטורים מתקדמים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="search" size={24} color="#1572b6" />
            <Title style={styles.sectionTitle}>סלקטורים מתקדמים</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('selectors')}
              icon={expandedSection === 'selectors' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'selectors' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'selectors' && (
            <View style={styles.selectorsGrid}>
              {selectors.map((selector, index) => (
                <Card key={index} style={styles.selectorCard}>
                  <Card.Content>
                    <Text style={styles.selectorSyntax}>{selector.selector}</Text>
                    <Text style={styles.selectorDescription}>{selector.description}</Text>
                    <Text style={styles.selectorExample}>{selector.example}</Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      {/* תכונות CSS3 */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette" size={24} color="#1572b6" />
            <Title style={styles.sectionTitle}>תכונות CSS3 חדשות</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('features')}
              icon={expandedSection === 'features' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'features' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'features' && (
            <View style={styles.featuresGrid}>
              {css3Features.map((feature, index) => (
                <Card key={index} style={styles.featureCard}>
                  <Card.Content>
                    <Text style={styles.featureName}>{feature.name}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                    <Surface style={styles.codeExample} elevation={1}>
                      <Text style={styles.codeText}>{feature.example}</Text>
                    </Surface>
                  </Card.Content>
                </Card>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Material Design */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette" size={24} color="#1976d2" />
            <Title style={styles.sectionTitle}>Material Design</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('material')}
              icon={expandedSection === 'material' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'material' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'material' && (
            <View>
              <Paragraph style={styles.materialDescription}>
                Material Design הוא מערכת עיצוב שפותחה על ידי Google, המבוססת על עקרונות 
                של עיצוב מודרני, צלליות, אנימציות חלקות וצבעים עקביים.
              </Paragraph>
              
              <Surface style={styles.codeBlock} elevation={1}>
                <Text style={styles.codeText}>{materialDesignExample}</Text>
              </Surface>
              
              <View style={styles.materialPrinciples}>
                <Text style={styles.principlesTitle}>עקרונות Material Design:</Text>
                <View style={styles.principlesList}>
                  <View style={styles.principleItem}>
                    <Ionicons name="layers" size={16} color="#1976d2" />
                    <Text style={styles.principleText}>Elevation - שימוש בצלליות ליצירת עומק</Text>
                  </View>
                  <View style={styles.principleItem}>
                    <Ionicons name="color-fill" size={16} color="#1976d2" />
                    <Text style={styles.principleText}>Color - צבעים עקביים ומשמעותיים</Text>
                  </View>
                  <View style={styles.principleItem}>
                    <Ionicons name="move" size={16} color="#1976d2" />
                    <Text style={styles.principleText}>Motion - אנימציות חלקות ומשמעותיות</Text>
                  </View>
                  <View style={styles.principleItem}>
                    <Ionicons name="text" size={16} color="#1976d2" />
                    <Text style={styles.principleText}>Typography - טיפוגרפיה ברורה וקריאה</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
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
    backgroundColor: '#1572b6',
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
    color: '#e3f2fd',
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
  selectorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectorCard: {
    width: '48%',
    marginBottom: 8,
  },
  selectorSyntax: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#1572b6',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  selectorDescription: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
  },
  selectorExample: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#666',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    marginBottom: 8,
  },
  featureName: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#1572b6',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
  },
  codeExample: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  materialDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  materialPrinciples: {
    marginTop: 16,
  },
  principlesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  principlesList: {
    marginLeft: 8,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  principleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default CSS3Screen;
