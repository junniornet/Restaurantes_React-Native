import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'

export default function UserLogged() {
    return (
        <View>
            <Text>UserLogged</Text>
            <Loading isVisible={true} text="Cargando..."/>
        </View>
    )
}

const styles = StyleSheet.create({})
