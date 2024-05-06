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
export const obtenerFiltros = async()=>{
    const filtros = [];
    const referenciaDatos = collection(db, 'filters');
    try{
        const q = await getDocs(referenciaDatos)
        q.forEach((doc) =>{
            filtros.push({id: doc.id, link: doc.data().link, tipo: doc.data().tipo})
            
        })
        console.log(filtros)
        return filtros;
    }catch(error){
        console.log(error)
    }
}

