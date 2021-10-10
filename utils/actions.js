/* import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore";
import db from './firebase' */
//import { firebaseApp } from './firebase'
import { auth } from "./firebaseAuth";
import { firebaseApp } from './firebase'
import { FireSQL } from 'firesql'
import * as firebases from 'firebase'
import 'firebase/firestore'
import * as Notifications from 'expo-notifications'
import Constans from 'expo-constants'

import { fileToBlob } from './helpers'
import { map } from 'lodash'
import { Alert } from 'react-native'
import { Platform } from 'react-native'

const db = firebases.firestore(firebaseApp)
const fireSQL = new FireSQL(firebases.firestore(), { includeId: "id" })

/* export const getCollection = async(coleccion) => {
const result = { statusResponse: false, data: null, error: null}
try {
    const data = await getDocs(collection(db, coleccion))
    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    result.statusResponse=true
    result.data=arrayData
} catch (error) {
    result.error=error
}
return result
}

export const addDocument = async(coleccion, data) => {
    const result = { statusResponse: false, data: null, error: null}
    try {
        const response = await addDoc(collection(db, coleccion), data)
        result.data = {id: response.id}
        result.statusResponse = true
    } catch (error) {
        result.error=error
    }
return result
}

export const getDocument = async(coleccion, id) =>{
    const result = { statusResponse: false, data: null, error: null}
    try {
        const data = doc(db, coleccion, id)
        const response = await getDoc(data)
        result.data = { id: response.id, ...response.data() }
        result.statusResponse=true
    } catch (error) {
        result.error=error
    }
    return result
}

export const updateDocument = async(coleccion, id, data) => {
    const result = { statusResponse: false, error: null}
    try {
        const documento = doc(db, coleccion, id)
        await updateDoc(documento, data)
        result.statusResponse= true
    } catch (error) {
        result.error= error
    }
    return result
}

export const deleteDocument = async(coleccion, id) =>{
    const result = { statusResponse: false, error: null}
    try {
        const documento = doc(db, coleccion, id)
        await deleteDoc(documento)
        result.statusResponse= true
    } catch (error) {
        result.error=error
    }
    return result
}

export const isUserLogged = () =>{
    let isLogged = false
    const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    isLogged=true
    const uid = user.uid;
    // ...
  } else {
    isLogged=true
    // User is signed out
    // ...
  }
});
return isLogged
 }

 export const closeSession = () =>{
   return firebase.auth().signOut()
 } */
 export const isUserLogged = () => {
    let isLogged = false
    firebases.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

 export const getCurrentUser = () => {
    return auth.currentUser
}

export const closeSession = () => {
    return auth.signOut()
}

 export const registerUser = async(email, password)=>{
/*    const result = { statusResponse:true, error:null}
   try {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
   } catch (error) {
     result.error=error
   } */

   const result = { statusResponse: true, error: null}
   try {
       await auth.createUserWithEmailAndPassword(email, password)
       .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
   } catch (error) {
       result.statusResponse = false
       result.error = error
   }
   return result
 }

 export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebases.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebases.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async(data) => {
    const result = { statusResponse: true, error: null }
    try {
        await auth.currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = firebases.auth().EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebases.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebases.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRestaurants = async(limitRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null }
    try {
        const response = await db
            .collection("restaurants")
            .orderBy("createAt", "desc")
            .limit(limitRestaurants)
            .get()
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getMoreRestaurants = async(limitRestaurants, startRestaurant) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null }
    try {
        const response = await db
            .collection("restaurants")
            .orderBy("createAt", "desc")
            .startAfter(startRestaurant.data().createAt)
            .limit(limitRestaurants)
            .get()
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getDocumentById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRestaurantReviews = async(id) => {
    const result = { statusResponse: true, error: null, reviews: [] }
    try {
        const response = await db
            .collection("reviews")
            .where("idRestaurant", "==", id)
            .get()
        response.forEach((doc) => {
            const review = doc.data()
            review.id = doc.id
            result.reviews.push(review)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getIsFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null, isFavorite: false }
    try {
        const response = await db
            .collection("favorites")
            .where("idRestaurant", "==", idRestaurant)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const deleteFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null }
    try {
        const response = await db
            .collection("favorites")
            .where("idRestaurant", "==", idRestaurant)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        response.forEach(async(doc) => {
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })    
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getFavorites = async() => {
    const result = { statusResponse: true, error: null, favorites: [] }
    try {
        const response = await db
            .collection("favorites")
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        await Promise.all(
            map(response.docs, async(doc) => {
                const favorite = doc.data()
                const restaurant = await getDocumentById("restaurants", favorite.idRestaurant)
                if (restaurant.statusResponse) {
                    result.favorites.push(restaurant.document)
                }
            })
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getTopRestaurants = async(limit) => {
    const result = { statusResponse: true, error: null, restaurants: [] }
    try {
        const response = await db
            .collection("restaurants")
            .orderBy("rating", "desc")
            .limit(limit)
            .get()
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const searchRestaurants = async(criteria) => {
    const result = { statusResponse: true, error: null, restaurants: [] }
    try {
        result.restaurants = await fireSQL.query(`SELECT * FROM restaurants WHERE name LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getToken = async() => {
    if (!Constans.isDevice) {
        Alert.alert("Debes utilizar un dispositivo físico para poder utilizar las notificaciones.")
        return
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status 
    }

    if (finalStatus !== "granted") {
        Alert.alert("Debes dar permiso para acceder a las notificaciones.")
        return
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data

    if (Platform.OS == "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C"
        })
    }

    return token
}

export const addDocumentWithId = async(collection, data, doc) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(doc).set(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
 })

 export const startNotifications = (notificationListener, responseListener) => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification)
    })   
    responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
        console.log(notification)
    })  
    return () => {
        Notifications.removeNotificationSubscription(notificationListener)
        Notifications.removeNotificationSubscription(responseListener)
    }
 }

export const sendPushNotification = async(message) => {
    let response = false
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(() => response = true)
    return response
}

export const setNotificationMessage = (token, title, body, data) => {
    const message = {
        to: token,
        sound: "default",
        title: title,
        body: body,
        data: data
    }
  
    return message
}
 
export const getUsersFavorite = async(restaurantId) => {
    const result = { statusResponse: true, error: null, users: [] }
    try {
        const response = await db.collection("favorites").where("idRestaurant", "==", restaurantId).get()
        await Promise.all(
            map(response.docs, async(doc) => {
                const favorite = doc.data()
                const user = await getDocumentById("users", favorite.idUser)
                if (user.statusResponse) {
                    result.users.push(user.document)
                }
            })
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const sendEmailResetPassword = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebases.auth().sendPasswordResetEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}