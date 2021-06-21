/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
//react fs
import RNFS, { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
import { SafeAreaProvider} from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'
import { PermissionsAndroid , Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Componentes
import Facturas from './src/Facturas/Facturas.js'
import HomeScreen from './src/HomeScreen/HomeScreen'
import ListaFacturas from './src/ListaFacturas/ListaFacturas.js'

//Android
const nombreArchivo = "/FacturasNoBorrar.txt";
const DDP = DownloadDirectoryPath+nombreArchivo;

var permisoDeLectura = false
var permisoDeEscritura = false 

const pedirPermisos = async () => {
  try{
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
      title: "Permiso para poder leer archivos",
      message:
        "Con este permiso se podrá leer la información en la App",
      buttonNeutral: "Preguntar Más tarde",
      buttonNegative: "Cancelar",
      buttonPositive: "OK"
    })
  
  if( granted === PermissionsAndroid.RESULTS.GRANTED){
    permisoDeLectura = true
  }
  }catch(err) {
    console.log(err)
  }

  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
      title: "Permiso para poder guardar archivos",
      message:
        "Con este permiso se podrá guardar la información en la App",
      buttonNeutral: "Preguntar Más tarde",
      buttonNegative: "Cancelar",
      buttonPositive: "OK"
    })

    if( granted == PermissionsAndroid.RESULTS.GRANTED){
      permisoDeEscritura = true
    }
  } catch (error) {
    console.log(error)
  }

}

const readFileFn =  RNFS.readFile(DDP)
  .then(result => {
      return result
  })
  .catch( (err) => {
    const arrRoot = []
    writeFileFn(JSON.stringify(arrRoot))
})


const writeFileFn = async (content, unicode = 'utf8') => {
  
    RNFS.writeFile(DDP, content, unicode)
    .then( result => {
      console.log(result)
      console.log("Exito")
    }).catch( (err) => {
      console.log(err)
    })
  
};

function App () {
 
  const [arregloDB, setArregloDB] = useState([])

  useEffect( () => {
    async function recuperarDatos(){
      const arr = await readFileFn
      .then( (res) => {
          setArregloDB(JSON.parse(res)) 
      }).catch( (error) => {
        console.log(error)
      })
    }
    pedirPermisos().then( () => {
      recuperarDatos()
    }).catch( (err) => {
      console.log(":C")
      console.log(erro)
    })
    
  }, [])

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <SafeAreaProvider>
      <Header
        backgroundColor="#5f9ea0"
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Facturas', style: { color: '#fff' } }}
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" > 
            {props => <HomeScreen {...props} arreglo={arregloDB}/>}
        </Stack.Screen>
        <Stack.Screen name="ListarFacturas" component={ListaFacturas} />
      </Stack.Navigator>
      
    </SafeAreaProvider>
    </NavigationContainer>
  )
}
export default App;
