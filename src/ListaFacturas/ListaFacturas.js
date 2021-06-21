import { BackgroundColor } from 'chalk'
import React,{useState, useReducer} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import {ListItem, Icon, FAB, Overlay} from 'react-native-elements'

//Component
import Facturas from '../Facturas/Facturas.js'

const list = [ 
    {
        numero: '1',
        fecha: '03/03/03',
        factura: '01011',
        razon_social: 'Mex',
        concepto: 'lorem ipsum dolor',
        importe_con_req: '100',
        importe_sin_req: '0'
    },
    
]

const ListaFacturas = (props) => {

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    //Fuerza el renderizado
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    console.log(props.route.params)

    return(
        <View style={{flex: 1}}>
            <View style={styles.totales}>
                <Text>Folio: {props.route.params.folio} </Text> 
                <Text>Total: </Text>    
                <Text>Total con req fiscal: </Text>
                <Text>Total con sin fiscal: </Text>
                <Text>Diferencia: </Text>
            </View>
            <ScrollView>
                {
                    list.map( (item, i) => (
                        <ListItem key={i} bottomDivider >
                            <Icon name='description' />
                            <ListItem.Content >
                                <ListItem.Title>Factura: {item.factura}</ListItem.Title>
                                <ListItem.Subtitle>Fecha: {item.fecha}</ListItem.Subtitle>
                                <ListItem.Subtitle>Razón social: {item.razon_social}</ListItem.Subtitle>
                                <ListItem.Subtitle>Concepto: {item.concepto}</ListItem.Subtitle>
                                <ListItem.Subtitle>Importe con req: {item.importe_con_req}</ListItem.Subtitle>
                                <ListItem.Subtitle>Importe sin req: {item.importe_sin_req}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ) )
                }
            </ScrollView>
            <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                <FAB  onPress={toggleOverlay} title="Agregar factura" placement='right' color="#55A9A8"/>
            </View>
            <Overlay fullScreen={true} isVisible={visible} onBackdropPress={toggleOverlay}>
                <Facturas folio={props.route.params.folio} cerrarVentana={toggleOverlay} />
            </Overlay>
        </View>
    )

}

const styles = StyleSheet.create({
    totales: {
        marginTop: 10,
        marginEnd: 10,
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 2,
        borderRadius: 5
    }
})

export default ListaFacturas;