import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import HomeScreen from './src/screens/HomeScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import GaleriaScreen from './src/screens/GaleriaScreen';
import NoticiasScreen from './src/screens/NoticiasScreen';
import ColaborarScreen from './src/screens/ColaborarScreen';
import RecuperarSenhaScreen from './src/screens/RecuperarSenhaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Galeria"
          component={GaleriaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Noticias"
          component={NoticiasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Colaborar"
          component={ColaborarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenhaScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
