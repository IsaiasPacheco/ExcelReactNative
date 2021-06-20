/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

//react fs
import RNFS, { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
import { SafeAreaProvider} from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'
import { PermissionsAndroid , Button } from 'react-native';

//Componentes
import Facturas from './src/Facturas/Facturas.js'
import HomeScreen from './src/HomeScreen/HomeScreen'

//Android
const nombreArchivo = "/FacturasNoBorrar.txt";
const DDP = DownloadDirectoryPath+nombreArchivo;

const input = res => res;
const output = str => str;

const archivoJSON = {
  "facturacion": {
    "numero": "037",
    "fecha": "03/03/03",
    "importe": "1000",
    "importe_sin_req_fis": "0",
    "importe_con_req_fis": "0",
    "total": "0",
    "diferencia": "0",
    "notas": {
      "fecha": "01/01/01",
      "factura": "0101010",
      "razon_social": "ISAIAS MEX",
      "Concepto": "APP",
      "importe_con_req": "0",
      "importe_sin_req": "0",
      "observaciones": "Fachero facherito"
    }
  }
}


const writeFileFn = async (content, unicode = 'utf8') => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Permiso para poder guardar archivos",
        message:
          "Con este permiso se podrá guardar la información en la App",
        buttonNeutral: "Preguntar Más tarde",
        buttonNegative: "Cancelar",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permisos de Escritura");
      
          RNFS.writeFile(DDP, JSON.stringify(archivoJSON), unicode)
        .then( result => {
          console.log( result, "Exito")
        }).catch( (err) => {
          console.log(err)
        })
      

    } else {
      console.log("Permisos de Lectura");
    }
  } catch (err) {
    console.warn(err);
  }
};

const readFileFn = async () => {
  RNFS.readFile(DDP)
      .then(result => {
          console.log(result)
      }).catch( (err) => {
        console.log(err)
      })
};

function App () {

  return (
    <SafeAreaProvider>
      <Header
        backgroundColor="#5f9ea0"
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Facturas', style: { color: '#fff' } }}
      />
      <Button onPress={() => readFileFn()} title="Guardar"/>
      <Facturas/> 
    </SafeAreaProvider>
  )
}
export default App;
