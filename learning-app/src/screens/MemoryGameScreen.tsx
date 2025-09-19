import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface Card {
  id: number;
  term: string;
  definition: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGameScreen = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const terms = [
    { term: "typeof", definition: "בודק טיפוס נתון" },
    { term: "falsy", definition: "0, \"\", null, undefined, false" },
    { term: "map", definition: "ממפה למערך חדש" },
    { term: "filter", definition: "מסנן לפי תנאי" },
    { term: "reduce", definition: "מצמצם לערך יחיד" },
    { term: "closure", definition: "סגירה על משתנים לקסיקליים" },
    { term: "promise", definition: "מעטפת לאסינכרוניות" },
    { term: "section", definition: "אזור תוכן סמנטי ב-HTML5" },
    { term: "transform", definition: "שינוי צורה/מיקום/גודל" },
    { term: "transition", definition: "אנימציית מעבר חלקה" },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    let id = 0;

    // יצירת זוגות של קלפים
    terms.forEach((item) => {
      gameCards.push(
        { id: id++, term: item.term, definition: item.term, isFlipped: false, isMatched: false },
        { id: id++, term: item.term, definition: item.definition, isFlipped: false, isMatched: false }
      );
    });

    // ערבוב הקלפים
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameCompleted(false);
  };

  const handleCardPress = (cardId: number) => {
    if (flippedCards.length >= 2 || cards.find(c => c.id === cardId)?.isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.term === secondCard.term) {
      // התאמה!
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);

        // בדיקה אם המשחק הושלם
        if (matchedPairs + 1 === terms.length) {
          setGameCompleted(true);
          Alert.alert(
            'כל הכבוד!',
            `סיימת את המשחק ב-${moves + 1} מהלכים!`,
            [{ text: 'משחק חדש', onPress: initializeGame }]
          );
        }
      }, 500);
    } else {
      // לא התאמה - הפיכת הקלפים חזרה
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const renderCard = (card: Card) => {
    const isFlipped = card.isFlipped || card.isMatched;
    const isSelected = flippedCards.includes(card.id);

    return (
      <Card
        key={card.id}
        style={[
          styles.card,
          isFlipped && styles.flippedCard,
          card.isMatched && styles.matchedCard,
          isSelected && styles.selectedCard
        ]}
        onPress={() => handleCardPress(card.id)}
      >
        <Card.Content style={styles.cardContent}>
          {isFlipped ? (
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{card.definition}</Text>
            </View>
          ) : (
            <View style={styles.cardBackContainer}>
              <Ionicons name="help-circle" size={32} color="#666" />
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (gameCompleted) {
    return (
      <ScrollView style={styles.container}>
        <Surface style={styles.completionContainer} elevation={4}>
          <View style={styles.completionHeader}>
            <Ionicons name="trophy" size={64} color="#ff9800" />
            <Title style={styles.completionTitle}>כל הכבוד!</Title>
            <Paragraph style={styles.completionSubtitle}>
              סיימת את משחק הזיכרון בהצלחה!
            </Paragraph>
          </View>

          <View style={styles.completionStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{moves}</Text>
              <Text style={styles.statLabel}>מהלכים</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{matchedPairs}</Text>
              <Text style={styles.statLabel}>זוגות</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((matchedPairs / moves) * 100)}%
              </Text>
              <Text style={styles.statLabel}>דיוק</Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={initializeGame}
            style={styles.playAgainButton}
          >
            משחק חדש
          </Button>
        </Surface>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Title style={styles.title}>משחק זיכרון</Title>
        <Paragraph style={styles.subtitle}>
          מצא זוגות של מונחים והגדרות
        </Paragraph>
      </Surface>

      <Surface style={styles.statsContainer} elevation={1}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="refresh" size={20} color="#1976d2" />
            <Text style={styles.statNumber}>{moves}</Text>
            <Text style={styles.statLabel}>מהלכים</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
            <Text style={styles.statNumber}>{matchedPairs}</Text>
            <Text style={styles.statLabel}>זוגות</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={20} color="#ff9800" />
            <Text style={styles.statNumber}>
              {Math.round((matchedPairs / Math.max(moves, 1)) * 100)}%
            </Text>
            <Text style={styles.statLabel}>דיוק</Text>
          </View>
        </View>
      </Surface>

      <View style={styles.gameContainer}>
        <View style={styles.cardsGrid}>
          {cards.map(renderCard)}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Button
          mode="outlined"
          onPress={initializeGame}
          style={styles.resetButton}
        >
          משחק חדש
        </Button>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2 - 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#9c27b0',
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
    color: '#f3e5f5',
    textAlign: 'center',
  },
  statsContainer: {
    margin: 16,
    marginTop: 8,
    padding: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  gameContainer: {
    padding: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    height: cardWidth,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  flippedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
    borderWidth: 2,
  },
  matchedCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  selectedCard: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
    borderWidth: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  cardBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  resetButton: {
    borderColor: '#1976d2',
  },
  completionContainer: {
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  completionHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  completionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  playAgainButton: {
    paddingVertical: 8,
  },
});

export default MemoryGameScreen;
