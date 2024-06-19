import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const isAdmin = userCredential.user.email === 'admin@gmail.com';
          navigation.navigate('Home', { isAdmin });
        })
        .catch((error) => {
          Alert.alert("Erro", error.message);
        });
    } else {
      Alert.alert("Erro", "Por favor preencha todos os campos.");
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#ffffff', '#0000FF']}
      style={styles.background}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/coruja.png')}
        style={styles.coruja}
      />
      <View style={styles.content}>
        <Text style={styles.header}>Bem-Vindo(a)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerLink}>Não possui conta? Cadastre-se Gratuitamente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={styles.forgotPasswordLink}>Esqueceu sua senha?</Text>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  coruja: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: 15,
  },
  inputPassword: {
    flex: 1,
    marginRight: 10,
  },
  eyeIcon: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerLink: {
    color: 'white',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  forgotPasswordLink: {
    color: 'white',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  }
});

export default LoginScreen;
