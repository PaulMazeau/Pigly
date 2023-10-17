import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

export default function SignUpScreen({ navigation }) {
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
                onChangeText={() => console.log('First time')}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Nom de famille"
                onChangeText={() => console.log('Last Name')}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Email"
                onChangeText={() => console.log('Email')}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <TextInput 
                style={styles.input}
                placeholder="Mot de passe"
                onChangeText={() => console.log('Mot de passe')}
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