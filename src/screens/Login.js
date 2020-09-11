import React, { useState } from 'react'
import { StyleSheet, Text, View,Image ,TextInput,TouchableOpacity,Alert, ActivityIndicator} from 'react-native'
import Button from '../components/Button';
import {firebase} from '../firebase/config.js';



export default function Login({navigation}) {
     const [emailAddress ,setEmailAddress]=useState(null);
     const [password ,setPassword]=useState(null);
     const [loading, setLoading]=useState(false);

     const login=()=>{
         if(!emailAddress || !password){
            return Alert.alert("Error", "You need to fill in the inputs",[{text:"Ok",onPress :() =>{}},
        ]);
         }
         setLoading(true);
         firebase
         .auth()
         .signInWithEmailAndPassword(email ,password)
         .then(res=>{
            //  console.log("res ",res);
             setLoading(false);
         }).catch(error=>{
            //  console.log("err",error);
             alert(error);
             setLoading(false);
         })

     };

    return (
        <View style={{flex:1,backgroundColor:"#fff"}}>
           <View style={{alignSelf:"center",marginTop:100}}>
              <Image source={require("../../assets/loading.png")}/>
              <Text style={{alignSelf:"center",marginTop:10,fontWeight:"bold"}}>Never forget your TODOs</Text>
           </View>
           <View style={styles.form}>
           
           <TextInput onChangeText={(text)=>setEmailAddress(text)} placeholder="Email Adress" style={styles.input} autoCapitalize="none"/>
           <TextInput onChangeText ={(text)=>setPassword(text)} placeholder="Password" style={styles.input} secureTextEntry={true}/>

           {loading ? ( <ActivityIndicator/> ) : (
            <Button onPress={login} title="Login" backgroundColor="#ffd700" />   )
           }
              
           
           </View>
           <View style={styles.signupView}>
               <TouchableOpacity onPress={()=>navigation.navigate("Signup")} style={{padding:20}}>
                <Text>Don't have an accound?{" "}<Text style={{color: "#00fa9a", fontWeight:"bold"}}>Sign up</Text></Text>

               </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginHorizontal:35,
        marginTop:40,
        
    
    },
    input:{
        height:60,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginBottom:30,

    },
    signupView:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",

    },
});
