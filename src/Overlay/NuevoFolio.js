import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import {Input, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'



const NuevoFolio = (props) => {
    //Estados para el datepicker
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [fecha, setFecha] = useState(new Date())

    //Estados para los campos
    const [numeroFolio, setNumeroFolio] = useState('')
    const [importeIngreso, setImporteIngreso] = useState('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShow(Platform.OS === 'ios');
        setFecha(currentDate);
    };

    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Ingrese los datos",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
    };

    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const guardarFolio = () => {
        if( importeIngreso.length == 0 && numeroFolio.length == 0){
            showToast()
        }
        console.log({folio: numeroFolio, fecha: fecha.toLocaleDateString(), ingreso: importeIngreso})
    }



    return(
        <View style={{flex: 1}}>
            <Input label="Número de folio" keyboardType="numeric" value={numeroFolio} onChange={ event => setNumeroFolio(event.nativeEvent.text) } placeholder="Ingrese el número de folio"/>
            <Input label="Fecha" value={fecha.toLocaleDateString()} editable={false}/>
            <TouchableOpacity onPress={showDatepicker} style={styles.btn}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Seleccionar fecha</Text>
            </TouchableOpacity>
            <Input label="Importe" keyboardType="numeric" value={importeIngreso} onChange={event => setImporteIngreso(event.nativeEvent.text)} placeholder="Ingrese el importe"/>

            <View style={{justifyContent: 'center', marginBottom: 20, flexDirection: 'row', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={guardarFolio} style={styles.btn}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, textAlign: 'center'}} >Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.cerrarVentana} style={styles.btn}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, textAlign: 'center'}} >Cancelar</Text>
                </TouchableOpacity>
            </View>
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

export default NuevoFolio

