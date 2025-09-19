import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, Divider, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const JavaScriptScreen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const dataTypes = [
    { example: 'undefined', type: 'Undefined', description: 'משתנה שהוכרז אבל לא קיבל ערך' },
    { example: 'null', type: 'Null', description: 'ערך ריק במכוון' },
    { example: 'true / false', type: 'Boolean', description: 'ערכי אמת/שקר' },
    { example: '"Hello world"', type: 'String', description: 'מחרוזת תווים' },
    { example: '16', type: 'Number', description: 'מספר שלם' },
    { example: '54.3', type: 'Number', description: 'מספר עשרונית' },
    { example: '{ id: 85 }', type: 'Object', description: 'אובייקט עם תכונות' },
    { example: 'function fn() {}', type: 'Function', description: 'פונקציה' },
    { example: '[42, "foo"]', type: 'Array', description: 'מערך של ערכים' },
    { example: '/$+[a-z]^/', type: 'RegExp', description: 'ביטוי רגולרי' },
    { example: 'NaN', type: 'NaN', description: '"Not a Number" - לא מספר' },
  ];

  const arrayMethods = [
    { name: 'push()', description: 'הוספת אלמנט לסוף המערך' },
    { name: 'pop()', description: 'הסרת האלמנט האחרון' },
    { name: 'shift()', description: 'הסרת האלמנט הראשון' },
    { name: 'unshift()', description: 'הוספת אלמנט לתחילת המערך' },
    { name: 'splice()', description: 'הוספה/הסרה של אלמנטים במיקום ספציפי' },
    { name: 'map()', description: 'יצירת מערך חדש עם טרנספורמציה' },
    { name: 'filter()', description: 'סינון אלמנטים לפי תנאי' },
    { name: 'reduce()', description: 'צמצום המערך לערך יחיד' },
    { name: 'find()', description: 'מציאת האלמנט הראשון שעונה על תנאי' },
    { name: 'indexOf()', description: 'מציאת אינדקס של אלמנט' },
    { name: 'sort()', description: 'מיון המערך' },
    { name: 'reverse()', description: 'היפוך סדר המערך' },
  ];

  const codeExamples = {
    dataTypes: `var price = 56.5;
console.log(typeof price); // "number"

var userName = "Yaron";
console.log(typeof userName); // "string"

var x;
console.log(typeof x); // "undefined"

var isSet = false;
console.log(typeof isSet); // "boolean"`,

    arrays: `var users = ["Dana", "Avi", "Haim"];

// הוספה
users.push("Shimi");
users.unshift("Tali");

// הסרה
users.pop(); // הסרת האחרון
users.shift(); // הסרת הראשון

// איטרציה
for(var i = 0; i < users.length; i++) {
    console.log(users[i]);
}`,

    functions: `// הגדרת פונקציה
function greetUser(name) {
    return "שלום " + name;
}

// פונקציה עם פרמטרים
function addNumbers(a, b) {
    return a + b;
}

// קריאה לפונקציות
console.log(greetUser("אבי")); // "שלום אבי"
console.log(addNumbers(5, 3)); // 8`,

    objects: `var user = {
    name: "אבי",
    age: 30,
    email: "avi@example.com"
};

// גישה לתכונות
console.log(user.name); // "אבי"
console.log(user["age"]); // 30

// הוספת תכונות
user.phone = "050-1234567";
user["isActive"] = true;`,
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>JavaScript בסיסי</Title>
        <Paragraph style={styles.subtitle}>
          טיפוסי נתונים, מערכים, פונקציות ואובייקטים
        </Paragraph>
      </Surface>

      {/* טיפוסי נתונים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={24} color="#1976d2" />
            <Title style={styles.sectionTitle}>טיפוסי נתונים</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('dataTypes')}
              icon={expandedSection === 'dataTypes' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'dataTypes' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'dataTypes' && (
            <View>
              <Surface style={styles.codeBlock} elevation={1}>
                <Text style={styles.codeText}>{codeExamples.dataTypes}</Text>
              </Surface>
              
              <View style={styles.dataTypesGrid}>
                {dataTypes.map((item, index) => (
                  <Card key={index} style={styles.dataTypeCard}>
                    <Card.Content>
                      <Text style={styles.dataTypeExample}>{item.example}</Text>
                      <Chip style={styles.typeChip} textStyle={styles.typeChipText}>
                        {item.type}
                      </Chip>
                      <Text style={styles.dataTypeDescription}>{item.description}</Text>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* מערכים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#4caf50" />
            <Title style={styles.sectionTitle}>מערכים ושיטות מובנות</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('arrays')}
              icon={expandedSection === 'arrays' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'arrays' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'arrays' && (
            <View>
              <Surface style={styles.codeBlock} elevation={1}>
                <Text style={styles.codeText}>{codeExamples.arrays}</Text>
              </Surface>
              
              <View style={styles.methodsGrid}>
                {arrayMethods.map((method, index) => (
                  <Card key={index} style={styles.methodCard}>
                    <Card.Content>
                      <Text style={styles.methodName}>{method.name}</Text>
                      <Text style={styles.methodDescription}>{method.description}</Text>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* פונקציות */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={24} color="#ff9800" />
            <Title style={styles.sectionTitle}>פונקציות</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('functions')}
              icon={expandedSection === 'functions' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'functions' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'functions' && (
            <Surface style={styles.codeBlock} elevation={1}>
              <Text style={styles.codeText}>{codeExamples.functions}</Text>
            </Surface>
          )}
        </Card.Content>
      </Card>

      {/* אובייקטים */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#9c27b0" />
            <Title style={styles.sectionTitle}>אובייקטים ליטרליים</Title>
            <Button 
              mode="text" 
              onPress={() => toggleSection('objects')}
              icon={expandedSection === 'objects' ? 'chevron-up' : 'chevron-down'}
            >
              {expandedSection === 'objects' ? 'סגור' : 'פתח'}
            </Button>
          </View>
          
          {expandedSection === 'objects' && (
            <Surface style={styles.codeBlock} elevation={1}>
              <Text style={styles.codeText}>{codeExamples.objects}</Text>
            </Surface>
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
    backgroundColor: '#1976d2',
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
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  dataTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataTypeCard: {
    width: '48%',
    marginBottom: 8,
  },
  dataTypeExample: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#1976d2',
    marginBottom: 4,
  },
  typeChip: {
    backgroundColor: '#e3f2fd',
    marginBottom: 4,
  },
  typeChipText: {
    color: '#1976d2',
    fontSize: 10,
  },
  dataTypeDescription: {
    fontSize: 11,
    color: '#666',
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  methodCard: {
    width: '48%',
    marginBottom: 8,
  },
  methodName: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#4caf50',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 11,
    color: '#666',
  },
});

export default JavaScriptScreen;
