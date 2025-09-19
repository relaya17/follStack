import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text, RadioButton, ProgressBar, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: string;
}

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // דוגמה לשאלות (במקום זה תוכל לטעון את כל 50 השאלות)
  const questions: Question[] = [
    {
      id: 1,
      topic: "React",
      question: "מה היתרון המרכזי של שימוש ב־React ב־SPA לעומת HTML סטטי?",
      options: [
        "ביצועים גבוהים יותר תמיד",
        "ניהול סטייט ו־UI דינמי",
        "פחות קוד בשרת",
        "אין יתרון ממשי"
      ],
      answer: "ניהול סטייט ו־UI דינמי"
    },
    {
      id: 2,
      topic: "HTTP",
      question: "מה תפקידה של ספריית Axios בפרויקט?",
      options: [
        "ניהול סטייט גלובלי",
        "ביצוע קריאות HTTP לשרת",
        "ניהול עיצוב רספונסיבי",
        "הצפנת סיסמאות"
      ],
      answer: "ביצוע קריאות HTTP לשרת"
    },
    {
      id: 3,
      topic: "React",
      question: "מה המשמעות של Controlled Component בטפסים ב־React?",
      options: [
        "הקלט מנוהל ע\"י הדפדפן",
        "הקלט מנוהל ע\"י ה־state של React",
        "הקלט נשמר במסד הנתונים",
        "אין קשר בין הטופס ל־state"
      ],
      answer: "הקלט מנוהל ע\"י ה־state של React"
    },
    {
      id: 4,
      topic: "Web",
      question: "למה חשוב להשתמש ב־alt לכל תמונה באתר?",
      options: [
        "כדי לשפר SEO ונגישות",
        "כדי להקטין את גודל התמונה",
        "כדי להוסיף אנימציה",
        "זה לא חובה"
      ],
      answer: "כדי לשפר SEO ונגישות"
    },
    {
      id: 5,
      topic: "React",
      question: "מה ההבדל בין props ל־state ב-React?",
      options: [
        "props משתנה ישירות",
        "props מהורה ו־state פנימי",
        "אין הבדל",
        "props רק ב־Class"
      ],
      answer: "props מהורה ו־state פנימי"
    }
  ];

  const progress = (currentQuestion + 1) / questions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'מצוין! אתה בקיא בחומר!';
    if (percentage >= 60) return 'טוב! יש מקום לשיפור';
    return 'נסה שוב! כדאי לחזור על החומר';
  };

  if (showResult) {
    return (
      <ScrollView style={styles.container}>
        <Surface style={styles.resultContainer} elevation={4}>
          <View style={styles.resultHeader}>
            <Ionicons 
              name="trophy" 
              size={64} 
              color={getScoreColor()} 
            />
            <Title style={styles.resultTitle}>החידון הושלם!</Title>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: getScoreColor() }]}>
              {score} / {questions.length}
            </Text>
            <Text style={styles.percentageText}>
              {Math.round((score / questions.length) * 100)}%
            </Text>
          </View>

          <Paragraph style={styles.scoreMessage}>
            {getScoreMessage()}
          </Paragraph>

          <View style={styles.resultActions}>
            <Button 
              mode="contained" 
              onPress={resetQuiz}
              style={styles.resetButton}
            >
              חידון חדש
            </Button>
          </View>
        </Surface>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>חידון טריוויה</Title>
        <Paragraph style={styles.subtitle}>
          שאלה {currentQuestion + 1} מתוך {questions.length}
        </Paragraph>
        <ProgressBar 
          progress={progress} 
          color="#1976d2" 
          style={styles.progressBar}
        />
      </Surface>

      <Card style={styles.questionCard}>
        <Card.Content>
          <View style={styles.questionHeader}>
            <Chip style={styles.topicChip}>
              {questions[currentQuestion].topic}
            </Chip>
            <Text style={styles.questionNumber}>
              שאלה {currentQuestion + 1}
            </Text>
          </View>

          <Title style={styles.questionText}>
            {questions[currentQuestion].question}
          </Title>

          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <Card 
                key={index} 
                style={[
                  styles.optionCard,
                  selectedAnswer === option && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(option)}
              >
                <Card.Content style={styles.optionContent}>
                  <RadioButton
                    value={option}
                    status={selectedAnswer === option ? 'checked' : 'unchecked'}
                    onPress={() => handleAnswerSelect(option)}
                    color="#1976d2"
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleNextQuestion}
            disabled={!selectedAnswer}
            style={styles.nextButton}
          >
            {currentQuestion < questions.length - 1 ? 'השאלה הבאה' : 'סיים חידון'}
          </Button>
        </Card.Content>
      </Card>

      <Surface style={styles.statsContainer} elevation={1}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4caf50" />
            <Text style={styles.statNumber}>{score}</Text>
            <Text style={styles.statLabel}>נכון</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="close-circle" size={24} color="#f44336" />
            <Text style={styles.statNumber}>{currentQuestion - score}</Text>
            <Text style={styles.statLabel}>לא נכון</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color="#ff9800" />
            <Text style={styles.statNumber}>
              {Math.round((score / (currentQuestion + 1)) * 100)}%
            </Text>
            <Text style={styles.statLabel}>דיוק</Text>
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
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  questionCard: {
    margin: 16,
    marginTop: 8,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicChip: {
    backgroundColor: '#e3f2fd',
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  optionText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    marginTop: 16,
  },
  statsContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  resultContainer: {
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: 24,
    color: '#666',
    marginTop: 8,
  },
  scoreMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  resultActions: {
    width: '100%',
  },
  resetButton: {
    paddingVertical: 8,
  },
});

export default QuizScreen;
