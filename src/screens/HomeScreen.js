import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/adesportiva_fs');
  };

  return (
    <LinearGradient
      colors={['#000000', '#ffffff', '#0000FF']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Olá, Seja bem-vindo(a)!</Text>
          <Text style={styles.description}>
            A Desportiva Penha, fundada em 01/08/2021,  Inicialmente focada no futebol feminino, a equipe começou seus treinos na Lec Sport, depois no Centro Esportivo Tiquatira, e atualmente treina no CEU Tiquatira. Em maio de 2024, a equipe feminina venceu o torneio do Dia Internacional das Mulheres. Em 2022, foi criado o projeto masculino para crianças de 8 a 13 anos, que treina na comunidade do Guga. Em 2023, a equipe sub-12 masculina foi campeã da 5ª Copa Davi Henrry.
          </Text>
        </View>
        <Text style={styles.patrocinadoresHeader}>Patrocinadores:</Text>
        <View style={styles.patrocinadoresContainer}>
          <Image source={require('../../assets/bio.png')} style={styles.patrocinador} />
          <Image source={require('../../assets/dr.png')} style={styles.patrocinador} />
          <Image source={require('../../assets/ellengraf.png')} style={styles.patrocinador} />
          <Image source={require('../../assets/hospital.png')} style={styles.patrocinador} />
          <Image source={require('../../assets/marcone.png')} style={styles.patrocinador} />
        </View>
        <TouchableOpacity style={styles.colaborarButton} onPress={() => navigation.navigate('Colaborar')}>
          <Text style={styles.colaborarButtonText}>Seja um Colaborador</Text>
        </TouchableOpacity>
        <View style={styles.instagramContainer}>
          <Text style={styles.instagramText}>@adesportiva_fs</Text>
          <TouchableOpacity onPress={openInstagram}>
            <FontAwesome name="instagram" size={24} color="#E1306C" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Agenda')}>
          <FontAwesome name="calendar" size={40} color="#00BFFF" />
          <Text style={styles.iconText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Galeria')}>
          <FontAwesome name="photo" size={40} color="#00BFFF" />
          <Text style={styles.iconText}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Noticias')}>
          <FontAwesome name="newspaper-o" size={40} color="#00BFFF" />
          <Text style={styles.iconText}>Notícias</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 20,
  },
  headerContainer: {
    padding: 10,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'justify',
    marginBottom: 20,
  },
  patrocinadoresHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 10,
  },
  patrocinadoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  patrocinador: {
    width: 100,
    height: 100,
    margin: 10,
  },
  colaborarButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  colaborarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'transparent',
  },
  icon: {
    alignItems: 'center',
  },
  iconText: {
    color: '#00BFFF',
  },
  instagramContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  instagramText: {
    fontSize: 16,
    color: '#00BFFF',
    marginRight: 10,
  }
});

export default HomeScreen;
