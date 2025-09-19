import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, Chip, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ReactRouterScreen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const routerConcepts = [
    { 
      concept: 'BrowserRouter', 
      description: 'מספק את הפונקציונליות של הניתוב',
      example: '<BrowserRouter><App /></BrowserRouter>',
      use: 'עוטף את האפליקציה הראשית'
    },
    { 
      concept: 'Routes', 
      description: 'מכיל את כל הנתיבים של האפליקציה',
      example: '<Routes><Route path="/" element={<Home />} /></Routes>',
      use: 'מחליף את Switch בגרסאות חדשות'
    },
    { 
      concept: 'Route', 
      description: 'מגדיר נתיב ספציפי וקומפוננטה',
      example: '<Route path="/about" element={<About />} />',
      use: 'מקשר בין URL לקומפוננטה'
    },
    { 
      concept: 'Link', 
      description: 'קישור לניווט בין דפים',
      example: '<Link to="/contact">צור קשר</Link>',
      use: 'מחליף את <a> לניווט פנימי'
    },
    { 
      concept: 'Navigate', 
      description: 'ניווט אוטומטי או מותנה',
      example: '<Navigate to="/login" replace />',
      use: 'הפניה אוטומטית או הגנה על דפים'
    },
    { 
      concept: 'useNavigate', 
      description: 'Hook לניווט מתוך קומפוננטה',
      example: 'const navigate = useNavigate(); navigate("/home");',
      use: 'ניווט מתוך JavaScript'
    },
    { 
      concept: 'useParams', 
      description: 'גישה לפרמטרים בנתיב',
      example: 'const { id } = useParams();',
      use: 'קריאת פרמטרים דינמיים'
    },
    { 
      concept: 'useLocation', 
      description: 'מידע על המיקום הנוכחי',
      example: 'const location = useLocation();',
      use: 'גישה לנתונים על הנתיב הנוכחי'
    }
  ];

  const routingExamples = {
    basic: `// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}`,

    navigation: `// Navigation.js
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">בית</Link>
      <Link to="/about">אודות</Link>
      <Link to="/contact">צור קשר</Link>
      <button onClick={handleLogin}>התחבר</button>
    </nav>
  );
}`,

    params: `// UserProfile.js
import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // חזרה לדף הקודם
  };

  return (
    <div>
      <h1>פרופיל משתמש: {userId}</h1>
      <button onClick={goBack}>חזור</button>
    </div>
  );
}

// App.js
<Route path="/user/:userId" element={<UserProfile />} />`,

    nested: `// App.js - נתיבים מקוננים
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="products" element={<Products />}>
      <Route index element={<ProductList />} />
      <Route path=":productId" element={<ProductDetail />} />
    </Route>
  </Route>
</Routes>

// Layout.js
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>כותרת האתר</header>
      <main>
        <Outlet /> {/* כאן יוצגו הקומפוננטות המקוננות */}
      </main>
      <footer>כותרת תחתונה</footer>
    </div>
  );
}`
  };

  const bestPractices = [
    'השתמש ב-BrowserRouter ברמה הגבוהה ביותר של האפליקציה',
    'ארגן נתיבים בצורה היררכית עם נתיבים מקוננים',
    'השתמש ב-Link במקום <a> לניווט פנימי',
    'הגן על נתיבים רגישים עם ProtectedRoute',
    'השתמש ב-lazy loading לקומפוננטות גדולות',
    'הגדר 404 page לנתיבים שלא קיימים',
    'השתמש ב-useNavigate לניווט מתוך JavaScript'
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>React Router</Title>
        <Paragraph style={styles.subtitle}>
          ניהול נתיבים וניווט באפליקציות React
        </Paragraph>
      </Surface>

      {/* מבוא */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#61dafb" />
            <Title style={styles.sectionTitle}>מה זה React Router?</Title>
          </View>
          <Paragraph style={styles.description}>
            React Router הוא הספרייה הסטנדרטית לניהול נתיבים (routing) באפליקציות React. 
            הוא מאפשר יצירת Single Page Applications (SPA) עם מספר דפים, ניווט בין דפים, 
            וניהול היסטוריית הדפדפן.
          </Paragraph>
        </Card.Content>
      </Card>

      {/* מושגים בסיסיים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#61dafb" />
            <Title style={styles.sectionTitle}>מושגים בסיסיים</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('concepts')}
              icon={expandedSection === 'concepts' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'concepts' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'concepts' && (
            <View style={styles.conceptsGrid}>
              {routerConcepts.map((concept, index) => (
                <Card key={index} style={styles.conceptCard}>
                  <Card.Content>
                    <Text style={styles.conceptName}>{concept.concept}</Text>
                    <Text style={styles.conceptDescription}>{concept.description}</Text>
                    <Surface style={styles.codeExample} elevation={1}>
                      <Text style={styles.codeText}>{concept.example}</Text>
                    </Surface>
                    <Chip style={styles.useChip} textStyle={styles.useChipText}>
                      {concept.use}
                    </Chip>
                  </Card.Content>
                </Card>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      {/* דוגמאות קוד */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={24} color="#61dafb" />
            <Title style={styles.sectionTitle}>דוגמאות קוד</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('examples')}
              icon={expandedSection === 'examples' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'examples' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'examples' && (
            <View>
              <View style={styles.exampleSection}>
                <Text style={styles.exampleTitle}>1. הגדרה בסיסית</Text>
                <Surface style={styles.codeBlock} elevation={1}>
                  <Text style={styles.codeText}>{routingExamples.basic}</Text>
                </Surface>
              </View>

              <View style={styles.exampleSection}>
                <Text style={styles.exampleTitle}>2. ניווט</Text>
                <Surface style={styles.codeBlock} elevation={1}>
                  <Text style={styles.codeText}>{routingExamples.navigation}</Text>
                </Surface>
              </View>

              <View style={styles.exampleSection}>
                <Text style={styles.exampleTitle}>3. פרמטרים דינמיים</Text>
                <Surface style={styles.codeBlock} elevation={1}>
                  <Text style={styles.codeText}>{routingExamples.params}</Text>
                </Surface>
              </View>

              <View style={styles.exampleSection}>
                <Text style={styles.exampleTitle}>4. נתיבים מקוננים</Text>
                <Surface style={styles.codeBlock} elevation={1}>
                  <Text style={styles.codeText}>{routingExamples.nested}</Text>
                </Surface>
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* שיטות עבודה מומלצות */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#4caf50" />
            <Title style={styles.sectionTitle}>שיטות עבודה מומלצות</Title>
          </View>
          
          <View style={styles.practicesList}>
            {bestPractices.map((practice, index) => (
              <View key={index} style={styles.practiceItem}>
                <Ionicons name="checkmark" size={16} color="#4caf50" />
                <Text style={styles.practiceText}>{practice}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* התקנה */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="download" size={24} color="#61dafb" />
            <Title style={styles.sectionTitle}>התקנה</Title>
          </View>
          
          <Surface style={styles.installBlock} elevation={1}>
            <Text style={styles.installText}>
              npm install react-router-dom{'\n'}
              # או{'\n'}
              yarn add react-router-dom
            </Text>
          </Surface>

          <Paragraph style={styles.installNote}>
            React Router v6 הוא הגרסה הנוכחית והמומלצת. 
            הוא כולל שיפורים בביצועים ופשטות השימוש.
          </Paragraph>
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
    backgroundColor: '#61dafb',
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
  conceptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  conceptCard: {
    width: '48%',
    marginBottom: 8,
  },
  conceptName: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#61dafb',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  conceptDescription: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
  },
  codeExample: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
  },
  useChip: {
    backgroundColor: '#e3f2fd',
  },
  useChipText: {
    color: '#61dafb',
    fontSize: 9,
  },
  exampleSection: {
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  practicesList: {
    marginTop: 8,
  },
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  practiceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  installBlock: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  installText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  installNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ReactRouterScreen;
