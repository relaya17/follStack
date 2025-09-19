import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Surface, Chip, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface AICodeAssistantProps {
  onCodeGenerated: (code: string, language: string) => void;
}

const AICodeAssistant: React.FC<AICodeAssistantProps> = ({ onCodeGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const languages = [
    { key: 'javascript', label: 'JavaScript', icon: 'logo-javascript' },
    { key: 'html', label: 'HTML', icon: 'logo-html5' },
    { key: 'css', label: 'CSS', icon: 'color-palette' },
    { key: 'react', label: 'React', icon: 'logo-react' },
    { key: 'python', label: 'Python', icon: 'logo-python' },
  ];

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // סימולציה של AI - במציאות תהיה קריאה ל-API
    setTimeout(() => {
      const mockCode = generateMockCode(prompt, selectedLanguage);
      setGeneratedCode(mockCode);
      setIsGenerating(false);
      onCodeGenerated(mockCode, selectedLanguage);
    }, 2000);
  };

  const generateMockCode = (prompt: string, language: string): string => {
    const templates = {
      javascript: `// ${prompt}
function ${prompt.toLowerCase().replace(/\s+/g, '')}() {
    // TODO: Implement your logic here
    console.log('Hello from ${prompt}');
    return true;
}

// Example usage
${prompt.toLowerCase().replace(/\s+/g, '')}();`,
      
      html: `<!-- ${prompt} -->
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prompt}</title>
</head>
<body>
    <h1>${prompt}</h1>
    <p>תוכן דינמי יוצג כאן</p>
</body>
</html>`,
      
      css: `/* ${prompt} */
.${prompt.toLowerCase().replace(/\s+/g, '-')} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.${prompt.toLowerCase().replace(/\s+/g, '-')} h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
}`,
      
      react: `import React, { useState } from 'react';

const ${prompt.replace(/\s+/g, '')} = () => {
    const [state, setState] = useState(null);

    return (
        <div className="${prompt.toLowerCase().replace(/\s+/g, '-')}">
            <h1>${prompt}</h1>
            <p>קומפוננטה React דינמית</p>
        </div>
    );
};

export default ${prompt.replace(/\s+/g, '')};`,
      
      python: `# ${prompt}
def ${prompt.toLowerCase().replace(/\s+/g, '_')}():
    """
    פונקציה Python ל-${prompt}
    """
    print("Hello from ${prompt}")
    return True

# Example usage
if __name__ == "__main__":
    ${prompt.toLowerCase().replace(/\s+/g, '_')}()`
    };

    return templates[language] || templates.javascript;
  };

  const copyToClipboard = () => {
    // במציאות תהיה פונקציה להעתקה
    console.log('Code copied to clipboard');
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="sparkles" size={24} color="#ff6b6b" />
          <Title style={styles.title}>AI Code Assistant</Title>
        </View>

        <Paragraph style={styles.description}>
          תאר מה אתה רוצה לבנות ואני אכין לך את הקוד!
        </Paragraph>

        <View style={styles.languageSelector}>
          {languages.map((lang) => (
            <Chip
              key={lang.key}
              selected={selectedLanguage === lang.key}
              onPress={() => setSelectedLanguage(lang.key)}
              style={styles.languageChip}
              icon={() => <Ionicons name={lang.icon as any} size={16} />}
            >
              {lang.label}
            </Chip>
          ))}
        </View>

        <TextInput
          label="תאר את הקוד שאתה רוצה..."
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={3}
          style={styles.input}
          placeholder="לדוגמה: פונקציה שמחשבת ממוצע של מערך"
        />

        <Button
          mode="contained"
          onPress={generateCode}
          loading={isGenerating}
          disabled={!prompt.trim()}
          style={styles.generateButton}
          icon="auto-fix"
        >
          {isGenerating ? 'יוצר קוד...' : 'צור קוד'}
        </Button>

        {generatedCode && (
          <Surface style={styles.codeContainer} elevation={2}>
            <View style={styles.codeHeader}>
              <Title style={styles.codeTitle}>קוד שנוצר:</Title>
              <IconButton
                icon="content-copy"
                size={20}
                onPress={copyToClipboard}
              />
            </View>
            <ScrollView style={styles.codeScroll}>
              <TextInput
                value={generatedCode}
                multiline
                numberOfLines={20}
                style={styles.codeOutput}
                editable={false}
                mode="outlined"
              />
            </ScrollView>
          </Surface>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
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
  languageSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  languageChip: {
    margin: 4,
  },
  input: {
    marginBottom: 16,
  },
  generateButton: {
    marginBottom: 16,
  },
  codeContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeScroll: {
    maxHeight: 300,
  },
  codeOutput: {
    fontFamily: 'monospace',
    fontSize: 12,
    backgroundColor: '#fff',
  },
});

export default AICodeAssistant;
