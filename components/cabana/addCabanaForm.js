import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Icon, Input, Image, CheckBox } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import * as ImagePicker from 'expo-image-picker';
import { addDocumentWithoutId, getCurrentUser } from '../../src/utils/action';

const widthScreen = Dimensions.get('window').width;

export default function AddCabanaForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorCapacity, setErrorCapacity] = useState(null);
  const [errorPrice, setErrorPrice] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  const addCabana = async () => {
    if (!validForm()) return;

    setLoading(true);
    const responseUploadImages = await uploadImages();
    const cabana = {
      name: formData.name,
      description: formData.description,
      phone: formData.phone,
      images: responseUploadImages,
      rating: 0,
      ratingTotal: 0,
      quantityVoting: 0,
      numRooms: formData.numRooms,
      maxCapacity: formData.maxCapacity,
      pricePerNight: formData.pricePerNight,
      allowPets: formData.allowPets,
      services: formData.services,
      createAt: new Date(),
      createBy: getCurrentUser().uid,
    };
    const responseAddDocument = await addDocumentWithoutId('cabanas', cabana);
    setLoading(false);

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show('Error al grabar la cabaña, intenta más tarde.', 3000);
      return;
    }

    navigation.navigate('cabanas');
  };

  const uploadImages = async () => {
    const imagesUrl = [];
    return imagesUrl; // Aquí se manejarían las imágenes subidas
  };

  const validForm = () => {
    let isValid = true;
    clearErrors();

    if (isEmpty(formData.name)) {
      setErrorName('Debes ingresar el nombre de la cabaña.');
      isValid = false;
    }
    if (isEmpty(formData.description)) {
      setErrorDescription('Debes ingresar una descripción.');
      isValid = false;
    }
    if (isNaN(formData.pricePerNight) || formData.pricePerNight <= 0) {
      setErrorPrice('Debes ingresar un precio válido.');
      isValid = false;
    }
    if (isNaN(formData.maxCapacity) || formData.maxCapacity <= 0) {
      setErrorCapacity('Debes ingresar una capacidad válida.');
      isValid = false;
    }
    if (isEmpty(formData.phone)) {
      setErrorPhone('Debes ingresar un teléfono válido.');
      isValid = false;
    }
    if (size(imagesSelected) === 0) {
      toastRef.current.show('Debes agregar al menos una imagen.', 3000);
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setErrorName(null);
    setErrorDescription(null);
    setErrorPhone(null);
    setErrorCapacity(null);
    setErrorPrice(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagesSelected([...imagesSelected, result.assets[0].uri]);
    }
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageCabana ImageCabana={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorPhone={errorPhone}
        errorCapacity={errorCapacity}
        errorPrice={errorPrice}
      />
      <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} pickImage={pickImage} />
      <Button title="Crear cabaña" onPress={addCabana} buttonStyle={styles.btnAddCabana} />
    </ScrollView>
  );
}

function ImageCabana({ ImageCabana }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={ImageCabana ? { uri: ImageCabana } : require('../../assets/no-image.png')}
      />
    </View>
  );
}

function UploadImage({ imagesSelected, setImagesSelected, pickImage }) {
  return (
    <ScrollView horizontal style={styles.viewImages}>
      {size(imagesSelected) < 10 && (
        <Icon type="material-community" name="camera" onPress={pickImage} />
      )}
      {imagesSelected.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
      ))}
    </ScrollView>
  );
}

function FormAdd({
  formData, setFormData,
  errorName, errorDescription, errorPhone, errorCapacity, errorPrice,
}) {
  const onChange = (e, type) => setFormData({ ...formData, [type]: e.nativeEvent.text });

  return (
    <View style={styles.viewForm}>
      <Input placeholder="Nombre de la cabaña" onChange={(e) => onChange(e, 'name')} errorMessage={errorName} />
      <Input placeholder="Descripción de la cabaña" multiline onChange={(e) => onChange(e, 'description')} errorMessage={errorDescription} />
      <Input placeholder="Teléfono de contacto" keyboardType="phone-pad" onChange={(e) => onChange(e, 'phone')} errorMessage={errorPhone} />
      <Input placeholder="Capacidad máxima" keyboardType="numeric" onChange={(e) => onChange(e, 'maxCapacity')} errorMessage={errorCapacity} />
      <Input placeholder="Precio por noche" keyboardType="numeric" onChange={(e) => onChange(e, 'pricePerNight')} errorMessage={errorPrice} />
      <CheckBox title="Permite mascotas" checked={formData.allowPets} onPress={() => setFormData({ ...formData, allowPets: !formData.allowPets })} />
    </View>
  );
}

const defaultFormValues = () => ({
  name: '',
  description: '',
  phone: '',
  maxCapacity: '',
  pricePerNight: '',
  allowPets: false,
});

const styles = StyleSheet.create({
  viewContainer: { height: '100%' },
  viewForm: { marginHorizontal: 10 },
  viewPhoto: { alignItems: 'center', height: 200, marginBottom: 20 },
  btnAddCabana: { margin: 20, backgroundColor: '#442484' },
  viewImages: { flexDirection: 'row', marginBottom: 10 },
  imagePreview: { width: 100, height: 100, margin: 5, borderRadius: 10 },
});
