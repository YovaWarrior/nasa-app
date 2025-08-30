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
          <Text style={styles.backText}>← Volver a la Galería</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalles de la Foto Marciana</Text>
      </View>
      
      <Image source={{ uri: photo.img_src }} style={styles.fullImage} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.photoTitle}>Fotografía de la Superficie de Marte</Text>
          <Text style={styles.photoSubtitle}>Capturada por el Rover {photo.rover.name} de la NASA</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>📷 Información de la Cámara</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre de Cámara:</Text>
            <Text style={styles.infoValue}>{photo.camera.full_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Código de Cámara:</Text>
            <Text style={styles.infoValue}>{photo.camera.name}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>🚀 Detalles de la Misión</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rover:</Text>
            <Text style={styles.infoValue}>{photo.rover.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estado:</Text>
            <Text style={[styles.infoValue, styles.activeStatus]}>
              {photo.rover.status === 'active' ? 'Activo' : photo.rover.status}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha Terrestre:</Text>
            <Text style={styles.infoValue}>{photo.earth_date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID de Foto:</Text>
            <Text style={styles.infoValue}>{photo.id}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>ℹ️ Acerca de Esta Imagen</Text>
          <Text style={styles.description}>
            Esta fotografía fue capturada por el rover {photo.rover.name} de la NASA en Marte utilizando la {photo.camera.full_name}. 
            La imagen fue tomada el {photo.earth_date} como parte de la misión continua de exploración de Marte para estudiar 
            la geología, el clima y el potencial de vida pasada o presente del planeta.
          </Text>
          <Text style={styles.description}>
            La cámara {photo.camera.name} es uno de varios instrumentos de imagen sofisticados a bordo del rover, 
            diseñada para capturar imágenes de alta resolución de la superficie marciana y ayudar en la navegación y análisis científico.
          </Text>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#00D4FF',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: '#00D4FF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#00D4FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E8F4F8',
    textAlign: 'center',
  },
  fullImage: {
    width: width,
    height: 450,
    backgroundColor: '#2A3441',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  mainInfo: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00D4FF',
  },
  photoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4FF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#00D4FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  photoSubtitle: {
    fontSize: 16,
    color: '#E8F4F8',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#1E2A3A',
    borderRadius: 15,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#00D4FF',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginBottom: 14,
    textShadowColor: '#00D4FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 15,
    color: '#B8C5D1',
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: '#E8F4F8',
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  activeStatus: {
    color: '#00FF88',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: '#00FF88',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 14,
    color: '#B8C5D1',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
});