import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import { getAuth } from 'firebase/auth'
import { isAdmin } from '../../../src/utils/action' // Asegúrate de que esta función esté bien definida


export default function cabana({navigation}) {
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    const auth = getAuth() 
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        // Verificamos si el UID es el del administrador
        if (isAdmin()) {
          setUser(true) // El usuario es admin
        } else {
          setUser(false) // El usuario no es admin
        }
      } else {
        setUser(false) // Si no hay usuario autenticado, denegamos el acceso
      }
    })
  }, [])

  return (
    <View style={styles.viewBody}>
        {
            user && (
                <Icon
                  type="material-community"
                  name="plus"
                  color="#442484"
                  reverse
                  containerStyle={styles.btnContainer}
                  onPress={() => navigation.navigate('addCabana')}
                />
            )
        }

    </View>
) 
}

const styles = StyleSheet.create({
viewBody: {
    flex: 1,
},
btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5
},
notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
},
notFoundText: {
    fontSize: 18,
    fontWeight: "bold"
}
})