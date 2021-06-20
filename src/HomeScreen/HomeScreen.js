import React , {useState, useEffect, useReducer} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { ListItem, Icon , FAB, Overlay } from 'react-native-elements'


//Componente
import NuevoFolio from '../Overlay/NuevoFolio'

const list = [
  {
    title: 'Folio: 000',
    icon: 'description'
  },
]

const HomePage = () => {

  const [listaFolios, setListaFolios ] = useState([])
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Fuerza el renderizado
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect( () => {
    setListaFolios(list)
  })

  const agregarFolio = () => {
    listaFolios.push({title: 'a', icon: 'description'})
    console.log(listaFolios)
    forceUpdate()
    console.log(list)
  }

  return(
    <View style={{flex: 1}}>
      <ScrollView>
      {
    listaFolios.map((item, i) => (
      <ListItem key={i} bottomDivider>
        <Icon name={item.icon} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
  </ScrollView>
    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
      <FAB onPress={toggleOverlay} title="Agregar folio" placement='right' color="#55A9A8"/>
    </View>
    <Overlay fullScreen={false} isVisible={visible} onBackdropPress={toggleOverlay}>
      <NuevoFolio cerrarVentana={toggleOverlay} />
    </Overlay>
    </View>
  )

}


const styles = new StyleSheet.create({

})

export default HomePage