import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  Pressable, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';

const API_BASE = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
const API_KEY = 'DEMO_KEY';

const getMarsPhotos = async () => {
  try {
    const url = `${API_BASE}/curiosity/photos?earth_date=2015-6-3&api_key=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }
    
    const data = await response.json();
    return data.photos.slice(0, 15);
    
  } catch (error) {
    console.error('Error:', error);
    
    // Datos de respaldo
    return [
      {
        id: 102693,
        img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        camera: { name: "FHAZ", full_name: "Cámara Frontal de Evitación de Peligros" },
        rover: { name: "Curiosity", status: "activo" }
      },
      {
        id: 102694,
        img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        camera: { name: "FHAZ", full_name: "Cámara Frontal de Evitación de Peligros" },
        rover: { name: "Curiosity", status: "activo" }
      },
      {
        id: 102695,
        img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RLB_486265291EDR_F0481570RHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        camera: { name: "RHAZ", full_name: "Cámara Trasera de Evitación de Peligros" },
        rover: { name: "Curiosity", status: "activo" }
      }
    ];
  }
};

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const data = await getMarsPhotos();
    setPhotos(data);
    setLoading(false);
  };

  const handlePhotoPress = (photo) => {
    navigation.navigate('PhotoDetail', { photo });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D4FF" />
        <Text style={styles.loadingText}>Cargando Fotos de Marte...</Text>
        <Text style={styles.loadingSubtext}>Conectando con NASA</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌌 Explorador de Marte NASA</Text>
        <Text style={styles.subtitle}>Rover Curiosity - Sol 1000</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        bounces={true}
        alwaysBounceVertical={false}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
        {photos.map((photo) => (
          <Pressable 
            key={photo.id} 
            style={styles.photoCard} 
            onPress={() => handlePhotoPress(photo)}
          >
            <Image source={{ uri: photo.img_src }} style={styles.photoImage} />
            <View style={styles.photoInfo}>
              <Text style={styles.cameraName}>{photo.camera.full_name}</Text>
              <Text style={styles.photoDate}>Fecha terrestre: {photo.earth_date}</Text>
              <Text style={styles.roverInfo}>Rover: {photo.rover.name}</Text>
              <Text style={styles.photoId}>ID de foto: {photo.id}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  header: {
    backgroundColor: '#1E2A3A',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#00D4FF',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00D4FF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#00D4FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F4F8',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F1419',
  },
  loadingText: {
    color: '#E8F4F8',
    fontSize: 20,
    marginTop: 16,
    fontWeight: '600',
  },
  loadingSubtext: {
    color: '#00D4FF',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 15,
    paddingBottom: 30,
    flexGrow: 1,
  },
  photoCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#00D4FF',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  photoImage: {
    width: '100%',
    height: 230,
    backgroundColor: '#2A3441',
  },
  photoInfo: {
    padding: 18,
    backgroundColor: '#1E2A3A',
  },
  cameraName: {
    color: '#00D4FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: '#00D4FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  photoDate: {
    color: '#E8F4F8',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '500',
  },
  roverInfo: {
    color: '#B8C5D1',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '500',
  },
  photoId: {
    color: '#7A8B99',
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.8,
  },
});