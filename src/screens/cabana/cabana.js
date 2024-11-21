import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { DarkModeContext } from '../../../DarkModeContext'; 

export default function Cabana({ route, navigation }) {
  const { darkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);
  const { newCabana } = route.params || {};

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      setUser(!!userInfo); // Actualiza el estado según si el usuario está autenticado
    });

    return () => unsubscribe();
  }, []);

  const dynamicStyles = darkModeEnabled ? styles.darkMode : styles.lightMode;

  return (
    <ScrollView style={[styles.viewBody, dynamicStyles.viewBody]}>
      <Icon
        type="material-community"
        name={darkModeEnabled ? 'moon' : 'sunny'}
        color={darkModeEnabled ? '#FFF' : '#000'}
        size={30}
        onPress={toggleDarkMode}
        containerStyle={styles.iconContainer}
      />

      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#442484"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('add-Cabana')}
        />
      )}

      {newCabana ? (
        <View style={styles.cabanaContainer}>
          <Text style={[styles.title, dynamicStyles.title]}>{newCabana.name}</Text>
          <Text style={[styles.description, dynamicStyles.description]}>{newCabana.description}</Text>
          <Text style={[styles.info, dynamicStyles.info]}>Teléfono: {newCabana.phone}</Text>
          <Text style={[styles.info, dynamicStyles.info]}>Capacidad máxima: {newCabana.maxCapacity} personas</Text>
          <Text style={[styles.info, dynamicStyles.info]}>Número de habitaciones: {newCabana.numRooms}</Text>
          <Text style={[styles.info, dynamicStyles.info]}>Precio por noche: ${newCabana.pricePerNight}</Text>
          <Text style={[styles.info, dynamicStyles.info]}>Permite mascotas: {newCabana.allowPets ? 'Sí' : 'No'}</Text>
        </View>
      ) : (
        <View style={styles.noCabanaContainer}>
          <Text style={styles.noCabanaText}>No se ha encontrado la cabaña.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: { flex: 1 },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  cabanaContainer: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  darkMode: {
    viewBody: { backgroundColor: '#1A1A1A' },
    title: { color: '#FFF' },
    description: { color: '#FFF' },
    info: { color: '#FFF' },
  },
  lightMode: {
    viewBody: { backgroundColor: '#F5F5F5' },
    title: { color: '#000' },
    description: { color: '#000' },
    info: { color: '#000' },
  },
  noCabanaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noCabanaText: {
    fontSize: 18,
    color: '#888',
  },
});