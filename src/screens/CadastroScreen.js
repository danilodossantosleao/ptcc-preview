// src/screens/CadastroScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation();

  const handleCadastro = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro ao cadastrar", "Todos os campos são obrigatórios.");
    } else if (!emailRegex.test(email)) {
      Alert.alert("Erro ao cadastrar", "Formato de email inválido");
    } else if (senha !== confirmarSenha) {
      Alert.alert("Erro ao cadastrar", "Senhas não conferem");
    } else {
      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          Alert.alert("Cadastro Bem-sucedido!", "Você será redirecionado para a tela de login.", [
            {
              text: "OK",
              onPress: () => navigation.navigate('Login')
            }
          ]);
        })
        .catch((error) => {
          Alert.alert("Erro ao cadastrar", error.message);
        });
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
        <Text style={styles.header}></Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default CadastroScreen;
