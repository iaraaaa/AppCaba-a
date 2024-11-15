import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { size } from 'lodash'

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

export const getCurrentLocation = async() => {
  const response = { status: false, location: null }
  const resultPermissions = await Permissions.askAsync(Permissions.LOCATION)
  if (resultPermissions.status === "denied") {
      Alert.alert("Debes dar permisos para la localización.")
      return response
  }
  const position = await Location.getCurrentPositionAsync({})
  const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
  }
  response.status = true
  response.location = location
  return response
}

export const loadImageFromGallery = async(array) => {
  const response = { status: false, image: null }
  const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
  if (resultPermissions.status === "denied") {
      Alert.alert("Debes de darle permiso para accerder a las imágenes del teléfono.")
      return response
  }   
  const result = await ImagePicker.launchImageLibraryAsync({      
      allowsEditing: true,
      aspect: array
  })
  if (result.cancelled) {
      return response
  }
  response.status = true
  response.image = result.uri
  return response
}


const styles = StyleSheet.create({})