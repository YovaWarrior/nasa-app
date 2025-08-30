import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PhotoDetailScreen({ route, navigation }) {
  const { photo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back to Gallery</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Mars Photo Details</Text>
      </View>
      
      <Image source={{ uri: photo.img_src }} style={styles.fullImage} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.photoTitle}>Mars Surface Photography</Text>
          <Text style={styles.photoSubtitle}>Captured by NASA's {photo.rover.name} Rover</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>📷 Camera Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Camera Name:</Text>
            <Text style={styles.infoValue}>{photo.camera.full_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Camera Code:</Text>
            <Text style={styles.infoValue}>{photo.camera.name}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>🚀 Mission Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rover:</Text>
            <Text style={styles.infoValue}>{photo.rover.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, styles.activeStatus]}>{photo.rover.status}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Earth Date:</Text>
            <Text style={styles.infoValue}>{photo.earth_date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Photo ID:</Text>
            <Text style={styles.infoValue}>{photo.id}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>ℹ️ About This Image</Text>
          <Text style={styles.description}>
            This photograph was captured by NASA's {photo.rover.name} rover on Mars using the {photo.camera.full_name}. 
            The image was taken on {photo.earth_date} as part of the ongoing Mars exploration mission to study the 
            planet's geology, climate, and potential for past or present life.
          </Text>
          <Text style={styles.description}>
            The {photo.camera.name} camera is one of several sophisticated imaging instruments aboard the rover, 
            designed to capture high-resolution images of the Martian surface and assist in navigation and scientific analysis.
          </Text>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ff6b35',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  fullImage: {
    width: width,
    height: 450,
    backgroundColor: '#333',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  mainInfo: {
    marginBottom: 24,
    alignItems: 'center',
  },
  photoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    textAlign: 'center',
    marginBottom: 8,
  },
  photoSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  infoSection: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#ffffff',
    flex: 2,
    textAlign: 'right',
  },
  activeStatus: {
    color: '#4CAF50',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'justify',
  },
});