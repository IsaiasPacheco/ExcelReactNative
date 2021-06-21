import React , {useState, useEffect, useReducer} from 'react'
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { ListItem, Icon , FAB, Overlay, Card, Button } from 'react-native-elements'
import RNFS from 'react-native-fs'

//Componente
import NuevoFolio from '../Overlay/NuevoFolio'

const list = [
  {
    icon: 'description',
    folio: 'Folio: 000',
    fecha: '06/06/1997',
    importe: '900',
    con_req_fis: '0',
    sin_req_fis: '0',
    total: '0',
    diferencia: '0',
  },
  
]

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
    console.log("Permiso de lectura concedido")
    permisoDeLectura = true
  }
  }catch(err) {
    console.log("Errror")
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
      console.log("Permiso de rescritura concedido")
      permisoDeEscritura = true
    }
  } catch (error) {
    console.log("Errror")
    console.log(error)
  }
}

const HomePage = (props) => {

  const [listaFolios, setListaFolios ] = useState([])
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Fuerza el renderizado
  const [, forceUpdate] = useReducer(x => x + 1, 0);


  const agregarFolio = (objFolio) => {
    listaFolios.push({title: 'a', icon: 'description'})
    console.log(listaFolios)
    forceUpdate()
    console.log(list)
  }

  const printIndex = (index) => {
    console.log(index)
  }

  return(
    <View style={{flex: 1}}>
      <ScrollView>
      {
    props.arreglo.map((item, i) => (
      <ListItem key={i} bottomDivider style={{flex: 1, marginTop: 10, marginLeft: 10, marginEnd: 10, elevation: 5}}>
        <Icon name={item.icon} />
        <TouchableOpacity onPress={() => props.navigation.navigate('Facturas', {index: i, folio: item.numFolio, arreglo: props.arreglo})} >
        <ListItem.Content >
          <ListItem.Title>Folio: {item.numFolio}</ListItem.Title>
          <ListItem.Subtitle>Fecha: {item.fecha}</ListItem.Subtitle>
          <ListItem.Subtitle>Importe: {item.importe}</ListItem.Subtitle>
          <ListItem.Subtitle>Con req. fis: {item.con_req_fis}</ListItem.Subtitle>
          <ListItem.Subtitle>Sin req. fis: {item.sin_req_fis} </ListItem.Subtitle>
          <ListItem.Subtitle>Total: {item.total} </ListItem.Subtitle>
          <ListItem.Subtitle>Diferencia: {item.diferencia} </ListItem.Subtitle>
        </ListItem.Content>
        </TouchableOpacity>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
  </ScrollView>
    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
      <FAB onPress={toggleOverlay} title="Agregar folio" placement='right' color="#55A9A8"/>
    </View>
    <Overlay fullScreen={false} isVisible={visible} onBackdropPress={toggleOverlay}>
      <NuevoFolio agregarFolioFn={agregarFolio} arreglo={props.arreglo} cerrarVentana={toggleOverlay} />
    </Overlay>
    </View>
  )

}


const styles = new StyleSheet.create({

})

export default HomePage