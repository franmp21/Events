//Importo la funcionalidad necesaria
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { 
    query,
    where,
    getDocs,
    collection, 
    getFirestore,
    addDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDK_R1mRNs15FIY6bsMBSL0mKMBDXqzAtw",
  authDomain: "events-c6b57.firebaseapp.com",
  projectId: "events-c6b57",
  storageBucket: "events-c6b57.appspot.com",
  messagingSenderId: "273268013340",
  appId: "1:273268013340:web:4f9898d5c394f9ae5ce2d9",
  measurementId: "G-ZHFD1Y38GX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);



//AUTENTICACIÓN 

export const createAccount = async(email, password, user)=>{
    await createUserWithEmailAndPassword(auth, email, password, user)
    .then(() => console.log('Se ha registrado correctamente!'))
    .catch((error) => {
        console.log(error)
    });
}
export const signIn = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
        console.log('Inicio de sesión existoso!')
    }catch(err){
        throw err;
    }  
};

//FUNCIONALIDAD BASE DE DATOS FIRESTORE

export const obtenerDatos = async(tabla, email)=>{
    const referenciaDatos = collection(db, tabla);
    try{
        const q = query(referenciaDatos, where('email', '==', email))
        const resultado = await getDocs(q);
        let res = [];
        resultado.forEach((doc) => {
            res = [doc.id, doc.data()]
        });
        return res;
    }catch(error){
        console.log(error)
    }
}
export const añadirDatos = async(tabla, datos)=>{
    const referenciaDatos = collection(db, tabla)
    try{
        const docRef = await addDoc(referenciaDatos, datos)
        
        return docRef;

    }catch(err){
        console.log(err)
    }
    
}
export const loginGoogle = async()=>{
    const provider = new GoogleAuthProvider()
    try{
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // IdP data available using getAdditionalUserInfo(result)
            console.log(user.email)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }catch(err){
        console.log(err)
    }
    
}
