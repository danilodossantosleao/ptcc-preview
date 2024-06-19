import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { collection, getDocs, updateDoc, doc, increment, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

const NoticiasScreen = () => {
  const [noticias, setNoticias] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(null); // Estado para controlar a exibição dos comentários

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasCollection = collection(db, '1'); // Atualizado para acessar a coleção "1"
        const noticiasSnapshot = await getDocs(noticiasCollection);
        const noticiasList = noticiasSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            comments: Array.isArray(data.comments) ? data.comments : [], // Garantir que comments seja um array
          };
        });
        console.log('Fetched noticias: ', noticiasList); // Debug log
        setNoticias(noticiasList);
      } catch (error) {
        console.error("Error fetching noticias: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const handleLike = async (id) => {
    try {
      const noticiaRef = doc(db, '1', id); // Atualizado para acessar a coleção "1"
      await updateDoc(noticiaRef, {
        likes: increment(1)
      });
      const updatedNoticias = noticias.map(noticia =>
        noticia.id === id ? { ...noticia, likes: noticia.likes + 1 } : noticia
      );
      setNoticias(updatedNoticias);
    } catch (error) {
      console.error("Error liking noticia: ", error);
    }
  };

  const handleComment = async (id) => {
    try {
      const noticiaRef = doc(db, '1', id); // Atualizado para acessar a coleção "1"
      const noticiaSnapshot = await getDoc(noticiaRef);
      const currentComments = noticiaSnapshot.data().comments || [];
      const updatedComments = [...currentComments, newComment];

      await updateDoc(noticiaRef, {
        comments: updatedComments
      });
      const updatedNoticias = noticias.map(noticia =>
        noticia.id === id ? { ...noticia, comments: updatedComments } : noticia
      );
      setNoticias(updatedNoticias);
      setNewComment('');
    } catch (error) {
      console.error("Error commenting on noticia: ", error);
    }
  };

  const toggleComments = (id) => {
    setShowComments(showComments === id ? null : id); // Alternar a exibição dos comentários
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando notícias...</Text>
      </View>
    );
  }

  if (noticias.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma notícia encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {noticias.map((noticia) => (
        <View key={noticia.id} style={styles.card}>
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Image source={{ uri: noticia.imagem }} style={styles.imagem} />
          <Text style={styles.descricao}>{noticia.descricao}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleLike(noticia.id)} style={styles.actionButton}>
              <FontAwesome name="thumbs-up" size={24} color="blue" />
              <Text>{noticia.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleComments(noticia.id)} style={styles.actionButton}>
              <FontAwesome name="comment" size={24} color="blue" />
              <Text>{noticia.comments.length}</Text>
            </TouchableOpacity>
          </View>
          {showComments === noticia.id && (
            <View style={styles.commentsSection}>
              {noticia.comments.map((comment, index) => (
                <Text key={index} style={styles.comment}>{comment}</Text>
              ))}
              <TextInput
                style={styles.input}
                placeholder="Adicione um comentário..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity onPress={() => handleComment(noticia.id)} style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  descricao: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentsSection: {
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoticiasScreen;
