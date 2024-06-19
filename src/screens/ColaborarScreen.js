import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';

const ColaborarScreen = () => {
  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/11952709624');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/penha2.png')}
        style={styles.image}
      />
      <Text style={styles.header}>Seja um Colaborador</Text>
      <Text style={styles.subheader}>Deixe a Desportiva Penha cada vez mais forte</Text>
      <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
        <Text style={styles.buttonText}>Entrar em Contato via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ColaborarScreen;
