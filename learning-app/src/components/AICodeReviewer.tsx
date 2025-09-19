import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Surface, Text, Chip, IconButton, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface CodeIssue {
  id: string;
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  line: number;
  severity: 'high' | 'medium' | 'low';
  fix?: string;
}

interface AICodeReviewerProps {
  onIssueFound: (issues: CodeIssue[]) => void;
}

const AICodeReviewer: React.FC<AICodeReviewerProps> = ({ onIssueFound }) => {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    
    // סימולציה של AI - במציאות תהיה קריאה ל-API
    setTimeout(() => {
      const foundIssues = performCodeAnalysis(code);
      const aiSuggestions = generateSuggestions(code);
      
      setIssues(foundIssues);
      setSuggestions(aiSuggestions);
      onIssueFound(foundIssues);
      setIsAnalyzing(false);
    }, 2000);
  };

  const performCodeAnalysis = (codeToAnalyze: string): CodeIssue[] => {
    const issues: CodeIssue[] = [];
    const lines = codeToAnalyze.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // בדיקת שגיאות נפוצות
      if (line.includes('var ') && !line.includes('let ') && !line.includes('const ')) {
        issues.push({
          id: `issue-${index}-1`,
          type: 'warning',
          message: 'מומלץ להשתמש ב-let או const במקום var',
          line: lineNumber,
          severity: 'medium',
          fix: line.replace('var ', 'const ')
        });
      }

      if (line.includes('==') && !line.includes('===')) {
        issues.push({
          id: `issue-${index}-2`,
          type: 'warning',
          message: 'מומלץ להשתמש ב-=== במקום ==',
          line: lineNumber,
          severity: 'medium',
          fix: line.replace('==', '===')
        });
      }

      if (line.includes('console.log') && !line.includes('//')) {
        issues.push({
          id: `issue-${index}-3`,
          type: 'suggestion',
          message: 'הסר console.log לפני פרודקשן',
          line: lineNumber,
          severity: 'low'
        });
      }

      if (line.includes('function') && !line.includes('=>')) {
        issues.push({
          id: `issue-${index}-4`,
          type: 'suggestion',
          message: 'שקול להשתמש ב-arrow function',
          line: lineNumber,
          severity: 'low'
        });
      }

      // בדיקת ביצועים
      if (line.includes('for (var') && line.includes('i++')) {
        issues.push({
          id: `issue-${index}-5`,
          type: 'suggestion',
          message: 'שקול להשתמש ב-for...of או forEach',
          line: lineNumber,
          severity: 'low'
        });
      }
    });

    return issues;
  };

  const generateSuggestions = (codeToAnalyze: string): string[] => {
    const suggestions: string[] = [];

    if (codeToAnalyze.includes('document.getElementById')) {
      suggestions.push('שקול להשתמש ב-querySelector לניווט מודרני יותר');
    }

    if (codeToAnalyze.includes('innerHTML')) {
      suggestions.push('היזהר מ-innerHTML - זה יכול לגרום לבעיות אבטחה');
    }

    if (codeToAnalyze.includes('addEventListener')) {
      suggestions.push('מעולה! אתה משתמש ב-event listeners מודרניים');
    }

    if (codeToAnalyze.includes('async') || codeToAnalyze.includes('await')) {
      suggestions.push('שימוש נהדר ב-async/await! זה מודרני ויעיל');
    }

    if (codeToAnalyze.includes('const') && codeToAnalyze.includes('let')) {
      suggestions.push('שימוש נכון ב-const ו-let - זה עקרונות ES6 טובים');
    }

    return suggestions;
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'suggestion': return 'lightbulb';
      default: return 'help';
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'suggestion': return '#2196f3';
      default: return '#666';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  const applyFix = (issue: CodeIssue) => {
    if (issue.fix) {
      const lines = code.split('\n');
      lines[issue.line - 1] = issue.fix;
      setCode(lines.join('\n'));
      
      // הסר את הבעיה מהרשימה
      setIssues(prev => prev.filter(i => i.id !== issue.id));
    }
  };

  const clearCode = () => {
    setCode('');
    setIssues([]);
    setSuggestions([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.mainCard}>
        <Card.Content>
          <View style={styles.header}>
            <Ionicons name="bug" size={24} color="#ff6b6b" />
            <Title style={styles.title}>AI Code Reviewer</Title>
          </View>

          <Paragraph style={styles.description}>
            הדבק את הקוד שלך ואני אבדוק אותו, אמצא שגיאות ואתן המלצות לשיפור
          </Paragraph>

          <TextInput
            label="הדבק את הקוד שלך כאן..."
            value={code}
            onChangeText={setCode}
            multiline
            numberOfLines={15}
            style={styles.codeInput}
            mode="outlined"
            placeholder="function example() {&#10;  var x = 5;&#10;  if (x == 5) {&#10;    console.log('Hello');&#10;  }&#10;}"
          />

          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={analyzeCode}
              loading={isAnalyzing}
              disabled={!code.trim()}
              style={styles.analyzeButton}
              icon="magnify"
            >
              {isAnalyzing ? 'בודק קוד...' : 'בדוק קוד'}
            </Button>

            <Button
              mode="outlined"
              onPress={clearCode}
              style={styles.clearButton}
              icon="delete"
            >
              נקה
            </Button>
          </View>
        </Card.Content>
      </Card>

      {issues.length > 0 && (
        <Card style={styles.issuesCard}>
          <Card.Content>
            <Title style={styles.issuesTitle}>
              בעיות שנמצאו ({issues.length})
            </Title>

            {issues.map((issue) => (
              <Surface key={issue.id} style={styles.issueItem} elevation={1}>
                <View style={styles.issueHeader}>
                  <View style={styles.issueInfo}>
                    <Ionicons 
                      name={getIssueIcon(issue.type) as any} 
                      size={20} 
                      color={getIssueColor(issue.type)} 
                    />
                    <View style={styles.issueDetails}>
                      <Text style={styles.issueMessage}>{issue.message}</Text>
                      <Text style={styles.issueLine}>שורה {issue.line}</Text>
                    </View>
                  </View>
                  <Chip 
                    style={[styles.severityChip, { backgroundColor: getSeverityColor(issue.severity) }]}
                    textStyle={styles.severityText}
                  >
                    {issue.severity}
                  </Chip>
                </View>

                {issue.fix && (
                  <View style={styles.fixContainer}>
                    <Text style={styles.fixLabel}>תיקון מוצע:</Text>
                    <Surface style={styles.fixCode} elevation={1}>
                      <Text style={styles.fixText}>{issue.fix}</Text>
                    </Surface>
                    <Button
                      mode="text"
                      onPress={() => applyFix(issue)}
                      style={styles.applyFixButton}
                      icon="check"
                    >
                      החל תיקון
                    </Button>
                  </View>
                )}
              </Surface>
            ))}
          </Card.Content>
        </Card>
      )}

      {suggestions.length > 0 && (
        <Card style={styles.suggestionsCard}>
          <Card.Content>
            <Title style={styles.suggestionsTitle}>
              המלצות AI ({suggestions.length})
            </Title>

            {suggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Ionicons name="bulb" size={20} color="#ff9800" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {issues.length === 0 && suggestions.length === 0 && code && !isAnalyzing && (
        <Card style={styles.successCard}>
          <Card.Content style={styles.successContent}>
            <Ionicons name="checkmark-circle" size={48} color="#4caf50" />
            <Title style={styles.successTitle}>קוד נקי!</Title>
            <Paragraph style={styles.successText}>
              לא נמצאו בעיות בקוד שלך. מעולה!
            </Paragraph>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  mainCard: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 16,
    color: '#666',
  },
  codeInput: {
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyzeButton: {
    flex: 1,
    marginRight: 8,
  },
  clearButton: {
    flex: 1,
    marginLeft: 8,
  },
  issuesCard: {
    margin: 16,
    marginTop: 8,
  },
  issuesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  issueItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  issueInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  issueDetails: {
    marginLeft: 12,
    flex: 1,
  },
  issueMessage: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  issueLine: {
    fontSize: 12,
    color: '#666',
  },
  severityChip: {
    height: 24,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
  },
  fixContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  fixLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  fixCode: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginBottom: 8,
  },
  fixText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
  applyFixButton: {
    alignSelf: 'flex-start',
  },
  suggestionsCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#fff3e0',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  successCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#e8f5e8',
  },
  successContent: {
    alignItems: 'center',
    padding: 24,
  },
  successTitle: {
    marginTop: 16,
    color: '#4caf50',
    textAlign: 'center',
  },
  successText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
});

export default AICodeReviewer;
