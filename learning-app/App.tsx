import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
// import BookletScreen from './src/screens/BookletScreen';
import JavaScriptScreen from './src/screens/JavaScriptScreen';
import HTML5Screen from './src/screens/HTML5Screen';
import CSS3Screen from './src/screens/CSS3Screen';
import QuizScreen from './src/screens/QuizScreen';
import MemoryGameScreen from './src/screens/MemoryGameScreen';
import AIHubScreen from './src/screens/AIHubScreen';
import ReactRouterScreen from './src/screens/ReactRouterScreen';

// Theme
import { theme } from './src/theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'JavaScript') {
            iconName = focused ? 'logo-javascript' : 'logo-javascript';
          } else if (route.name === 'HTML5') {
            iconName = focused ? 'logo-html5' : 'logo-html5';
          } else if (route.name === 'CSS3') {
            iconName = focused ? 'color-palette' : 'color-palette-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Memory') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'AI Hub') {
            iconName = focused ? 'sparkles' : 'sparkles-outline';
          } else if (route.name === 'React Router') {
            iconName = focused ? 'git-network' : 'git-network-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'בית' }}
      />
      {/* <Tab.Screen 
        name="Booklet" 
        component={BookletScreen} 
        options={{ title: 'חוברת' }}
      /> */}
      <Tab.Screen 
        name="JavaScript" 
        component={JavaScriptScreen} 
        options={{ title: 'JavaScript' }}
      />
      <Tab.Screen 
        name="HTML5" 
        component={HTML5Screen} 
        options={{ title: 'HTML5' }}
      />
      <Tab.Screen 
        name="CSS3" 
        component={CSS3Screen} 
        options={{ title: 'CSS3' }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ title: 'חידון' }}
      />
      <Tab.Screen 
        name="Memory" 
        component={MemoryGameScreen} 
        options={{ title: 'זיכרון' }}
      />
      <Tab.Screen 
        name="AI Hub" 
        component={AIHubScreen} 
        options={{ title: 'AI Hub' }}
      />
      <Tab.Screen 
        name="React Router" 
        component={ReactRouterScreen} 
        options={{ title: 'React Router' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}