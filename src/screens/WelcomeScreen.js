// src/screens/WelcomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#000000', '#ffffff', '#0000FF']}
      style={styles.background}
    >
      <View style={styles.content}>
        <Image
          source={require('../../assets/coruja.png')}
          style={styles.coruja}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}></Text>
          <Text style={styles.subtitle}></Text>
          <Text style={styles.greeting}></Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonSolid]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Acessar minha conta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.buttonOutline]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  coruja: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center'
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 40,
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 30, // Extra padding at the bottom
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%', // Ensure it takes the full width
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSolid: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'blue',
  }
});

export default WelcomeScreen;
