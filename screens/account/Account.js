import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import Loading from '../../components/Loading'
//import { isUserLogged } from '../../utils/actions'

import UserLogged from './UserLogged'
import UserGuest from './UserGuest'


export default function Account() {
const [login, setLogin] = useState(null)

useEffect(()=>{
    setLogin(false/*isUserLogged()*/)
}, [])

 //if (login == null){
     //} 
    //return <Loading isVisible={true} text="Cargando..."/>

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
