import React, { useState, useEffect } from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input,CheckBox,Button  } from 'react-native-elements'

const Facturas = () => {
    
    //Estados para la informacion
    const [fecha, setFecha] = useState(new Date())
    const [razonSocial, setRazonSocial] = useState('')
    const [concepto, setConcepto] = useState('')
    const [requisitoFiscal,setRequisitoFiscal] = useState(false)
    const [importe,setImporte] = useState('0')
    const [observaciones, setObservaciones] = useState('')
    const [folio, setFolio] = useState('000')

    //Estados para el datepicker
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShow(Platform.OS === 'ios');
        setFecha(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    return(
        <ScrollView>
        <View >
            <Text style={styles.folio}> Folio: {folio} </Text>
            <Input placeholder='Fecha' label="Fecha" editable={false} style={styles.fecha} value={fecha.toLocaleDateString()}/>
            <TouchableOpacity onPress={showDatepicker} style={styles.btn}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Seleccionar fecha</Text>
            </TouchableOpacity>
            <Input label="Razón social" placeholder='Ingrese la razon social' value={razonSocial} onChange={text => setRazonSocial(text)}/>
                

            <Input multiline placeholder='Ingrese el concepto' label="Concepto" value={concepto} onChange={text => setConcepto(text)} />
            
            <CheckBox
                title='Con requisito fiscal'
                checked={requisitoFiscal}
                onPress={ () => {
                    var dato = requisitoFiscal
                    setRequisitoFiscal(!dato)} 
                }
                />
            <Input placeholder='Importe'  label="Importe" value={importe} onChange={text => setImporte(text)}/>
            <Input multiline label="Observaciones" placeholder='Observaciones' value={observaciones} onChange={text => setObservaciones(text)} />

            <Button title="Guardar factura"/>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={fecha}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
        </ScrollView>
    )   
}

const styles = StyleSheet.create({
    fecha: {
        height: 40, 
        paddingLeft: 6
    },
    btn: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "#55A9A8",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 20,
        minWidth: "48%",
        textAlign: "center",
    },
    folio: {
        fontWeight:'bold',
        color: "#898989",
        marginBottom: 20,
        marginTop: 10,
    }
    
})

export default Facturas;