import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image 
                source={require("../../assets/tiendy-logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
            <Text style={styles.descripcion}>Si no estás registrado regístrate acá</Text>
            <Button
                buttonStyle={styles.buttom}
                title="Ver tu perfil"
                onPress={()=> navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal:30
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:10
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginVertical:10,
        textAlign:"center"
    },
    descripcion:{
        textAlign:"justify",
        marginBottom:20,
        color: "#a65273"
    },
    buttom:{
        backgroundColor:"#442484"
    }
})