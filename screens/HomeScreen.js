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
      throw new Error(`HTTP error! status: ${response.status}`);
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
        camera: { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
        rover: { name: "Curiosity", status: "active" }
      },
      {
        id: 102694,
        img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        camera: { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
        rover: { name: "Curiosity", status: "active" }
      },
      {
        id: 102695,
        img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RLB_486265291EDR_F0481570RHAZ00323M_.JPG",
        earth_date: "2015-05-30",
        camera: { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
        rover: { name: "Curiosity", status: "active" }
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
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.loadingText}>Loading NASA Mars Photos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚀 NASA Mars Explorer</Text>
        <Text style={styles.subtitle}>Curiosity Rover - Sol 1000</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.photoDate}>Earth Date: {photo.earth_date}</Text>
              <Text style={styles.roverInfo}>Rover: {photo.rover.name}</Text>
              <Text style={styles.photoId}>Photo ID: {photo.id}</Text>
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
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#ff6b35',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff6b35',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  photoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff6b35',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  photoImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#333',
  },
  photoInfo: {
    padding: 16,
  },
  cameraName: {
    color: '#ff6b35',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  photoDate: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 4,
  },
  roverInfo: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 4,
  },
  photoId: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
});