import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadScreen = () => {
  const [media, setMedia] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { isAdmin } = route.params || { isAdmin: false };

  const fetchApprovedMedia = async () => {
    const q = query(collection(db, 'uploads'), where('approved', '==', true));
    const querySnapshot = await getDocs(q);
    const approvedMedia = [];
    querySnapshot.forEach((doc) => {
      approvedMedia.push({ id: doc.id, ...doc.data() });
    });
    setMedia(approvedMedia);
  };

  useEffect(() => {
    fetchApprovedMedia();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `uploads/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const newMedia = { uri: downloadURL, type: result.assets[0].type, approved: isAdmin };
      setMedia((prevMedia) => [...prevMedia, newMedia]);

      await addDoc(collection(db, 'uploads'), {
        uri: downloadURL,
        type: result.assets[0].type,
        approved: isAdmin,
        timestamp: serverTimestamp(),
      });

      if (isAdmin) {
        Alert.alert('Sucesso', 'Imagem ou vídeo publicado com sucesso!');
        fetchApprovedMedia(); // Atualizar a lista de mídias aprovadas
      } else {
        Alert.alert('Sucesso', 'Imagem ou vídeo enviado para aprovação!');
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.mediaContainer}>
      {item.type.startsWith('image') ? (
        <Image source={{ uri: item.uri }} style={styles.media} />
      ) : (
        <Video source={{ uri: item.uri }} style={styles.media} useNativeControls />
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#ffffff', '#0000FF']} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/coruja.png')} style={styles.coruja} />
      <Text style={styles.header}>Fazer uma postagem</Text>
      {isAdmin && (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Escolher Imagem ou Vídeo</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.mediaList}
      />
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  mediaList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mediaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default UploadScreen;
