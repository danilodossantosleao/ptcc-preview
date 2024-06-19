  import React, { useState } from 'react';
  import { StyleSheet, View, Image, FlatList, TouchableOpacity, Modal, Text, Button } from 'react-native';

  // Dados das imagens com base nos nomes fornecidos
  const imageData = [
    { id: '1', uri: require('../../assets/img1.png') },
    { id: '2', uri: require('../../assets/img2.png') },
    { id: '3', uri: require('../../assets/img3.jpg') },
    { id: '4', uri: require('../../assets/img4.jpg') },
    { id: '5', uri: require('../../assets/img5.jpg') },
    { id: '6', uri: require('../../assets/img6.jpg') },
    { id: '7', uri: require('../../assets/img7.jpg') },
    { id: '8', uri: require('../../assets/img8.jpg') },
    { id: '9', uri: require('../../assets/img9.jpg') },
    { id: '10', uri: require('../../assets/img10.jpg') },
    { id: '11', uri: require('../../assets/img11.jpg') },
    { id: '12', uri: require('../../assets/img12.jpg') },
    { id: '13', uri: require('../../assets/img13.jpg') },
    { id: '14', uri: require('../../assets/img14.jpg') },
    { id: '15', uri: require('../../assets/img15.jpg') },
    { id: '16', uri: require('../../assets/img16.jpg') },
    { id: '17', uri: require('../../assets/img17.jpg') },
    { id: '18', uri: require('../../assets/img18.jpg') },
    { id: '19', uri: require('../../assets/img19.jpg') },
    { id: '20', uri: require('../../assets/img20.jpg') },
    { id: '21', uri: require('../../assets/img21.jpg') },
    { id: '22', uri: require('../../assets/img22.jpg') },
    { id: '24', uri: require('../../assets/img24.jpg') },
    { id: '25', uri: require('../../assets/img25.jpg') },
    { id: '26', uri: require('../../assets/img26.jpg') },
    { id: '27', uri: require('../../assets/img27.jpg') },
    { id: '11', uri: require('../../assets/img11.jpg') }
  ];

  const GaleriaScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (imageUri) => {
      setSelectedImage(imageUri);
      setModalVisible(true);
    };

    const closeImage = () => {
      console.log("Fechar modal"); // Adiciona depuração
      setSelectedImage(null); // Limpa a imagem selecionada
      setModalVisible(false);
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.imageContainer} onPress={() => openImage(item.uri)}>
        <Image source={item.uri} style={styles.image} />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={imageData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3} // Layout de grade
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeImage}
        >
          <View style={styles.modalView}>
            {selectedImage && <Image source={selectedImage} style={styles.fullImage} />}
            <Button title="Fechar" onPress={closeImage} color="gray" />
          </View>
        </Modal>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: 'white',
    },
    imageContainer: {
      flex: 1 / 3,
      aspectRatio: 1,
      padding: 2
    },
    image: {
      height: '100%',
      width: '100%'
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 20
    },
    fullImage: {
      width: '100%',
      height: '80%',
      resizeMode: 'contain',
      marginBottom: 20
    }
  });

  export default GaleriaScreen;
