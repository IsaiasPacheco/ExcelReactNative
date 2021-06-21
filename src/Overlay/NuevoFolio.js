import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import {Input, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'

import RNFS, {DownloadDirectoryPath} from 'react-native-fs'
const nombreArchivo = "/FacturasNoBorrar.txt";
const DDP = DownloadDirectoryPath+nombreArchivo
const unicode = 'utf8'

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

    const p = () => {
        console.log(props.arreglo)
    }

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
        }else {
            const arr = {icon:'description',numFolio: numeroFolio, fecha: fecha.toLocaleDateString(), importe: importeIngreso, con_req_fis:'0', sin_req_fis:'0', facturasList:[], total: '0', diferecia: '0'}
        
            if (Object.values(props.arreglo).length === 0){
                //console.log( (props.arreglo))
                props.arreglo.push(arr)
                RNFS.unlink(DDP).then( () => {
                    RNFS.writeFile(DDP, JSON.stringify(props.arreglo), unicode)
                    .then(() => {
                        console.log("Guardado exitoso")
                    }).catch( (error) => {
                        console.log("Error al guardar")
                        console.log(error)
                    })
                }).catch( (error) => {
                    console.log(error)
                    console.log("Error al eliminar")
                })
                //console.log(props.arreglo)
            }else{
                for( var i=0; i<Object.values(props.arreglo).length; i++){
                    if( props.arreglo[i].numFolio === numeroFolio ){
                        //console.log("No se puede agregar ya que existe el folio")
                    }else{
                        //Si no existe escribir en arreglo
                        props.arreglo.push(arr)
                        RNFS.unlink(DDP).then( () => {
                            RNFS.writeFile(DDP, JSON.stringify(props.arreglo), unicode)
                            .then(() => {
                                console.log("Guardado exitoso")
                            }).catch( (error) => {
                                console.log("Error al guardar")
                                console.log(error)
                            })
                        }).catch( (error) => {
                            console.log(error)
                            console.log("Error al eliminar")
                        })
                        break;
                        //console.log(props.arreglo)
                    }
                }
            } 
        }
        //console.log({folio: numeroFolio, fecha: fecha.toLocaleDateString(), ingreso: importeIngreso})
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

