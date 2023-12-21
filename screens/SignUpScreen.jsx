import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

export default function SignUpScreen() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const SignUpUser = (email, password, firstName, lastName) => {
        createUserWithEmailAndPassword(FB_AUTH, email, password)
        .then((userCredential) => {
            // Enregistrement des informations de l'utilisateur dans Firestore
            const userDocRef = doc(FB_DB, 'users', userCredential.user.uid);
            setDoc(userDocRef, {
                FirstName: firstName,
                LastName: lastName,
                // Vous pouvez ajouter d'autres champs si nécessaire
            })
            .then(() => {
                console.log('Informations de lutilisateur enregistrées dans Firestore');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            })
            .catch((error) => {
                console.error('Erreur lors de lenregistrement des informations de lutilisateur:', error);
            });
        })
        .catch((error) => {
            console.error('Erreur lors de linscription:', error);
        });
    };
    
      

  return (
    <View style={styles.container}> 
        <SafeAreaView>
        <TouchableOpacity 
        style={styles.BackBtn}
        onPress={() => navigation.goBack()}
        >
            <Text>Retour</Text>
        </TouchableOpacity>
        </SafeAreaView>
        <Text style={styles.text}>Créer un {'\n'}compte. </Text>
        <View style={styles.main}>
            <TextInput 
                style={styles.input}
                placeholder="Prénom"
                onChangeText={(text) => setFirstName(text)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Nom de famille"
                onChangeText={(text) => setLastName(text)}                
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}                
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Mot de passe"
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
        </View>
        <TouchableOpacity
            onPress={() => SignUpUser(email, password, firstName, lastName)}
            style={styles.button}
        >
            <Text>S'inscrire</Text>
        </TouchableOpacity>
        
        <View style={styles.rowseparator}>
            <View style={styles.separator} />
            <Text style={styles.txtseparator}>Ou</Text>
            <View style={styles.separator} />
        </View>

        <TouchableOpacity
            onPress={() => console.log('google')}
            style={styles.buttonGoogle}
        >
            <Text>S'inscrire avec google</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => console.log('facebook')}
            style={styles.buttonFacebook}
        >
            <Text style={styles.txtBtn2}>S'inscrire avec facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={styles.button2}
        >
            <Text style={styles.txtBtn2}>Tu as déjà un compte? Connecte toi</Text>
        </TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#121212'
},
text:{
    fontWeight: 'bold',
    fontSize: 37,
    color: 'white',
    marginTop: '5%',
    marginLeft: '10%'
},
txtBtn2: {
    color: 'white'
},
main: {
    width:'100%',
    marginTop: '10%'
},
input:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius:10,
    marginTop:10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%'
},
rowseparator:{
    flexDirection: 'row',
    justifyContent: 'center',
},
separator: {
    width: '30%', 
    height: 1, 
    backgroundColor: 'white', 
    marginTop: 20,
},
txtseparator: {
    width: '20%',
    color: 'white',
    justifyContent: 'center',
    textAlign:'center',
},
button: {
    marginTop: 50,
    height: 47,
    width: '80%',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: '10%',
    marginRight: '10%'
},
buttonFacebook: {
    marginTop: 20,
    height: 47,
    width: '80%',
    backgroundColor: "#172ACE",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: '10%',
    marginRight: '10%',
},
buttonGoogle: {
    marginTop: 50,
    height: 47,
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: '10%',
    marginRight: '10%'
},
button2: {
    marginTop: 20,
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center'
},
BackBtn: {
    marginLeft: '10%'
}
})