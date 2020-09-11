import React, { useState } from 'react';
import { StyleSheet, Text, View,Image ,TextInput,TouchableOpacity,Alert, ActivityIndicator} from 'react-native';
import Button from '../components/Button';
import {firebase} from '../firebase/config.js';



export default function Signup({navigation}) {
 
     const [email ,setEmail]=useState(null);
     const [password ,setPassword]=useState(null);
    
     const [loading, setLoading]=useState(false);

     const signup = () => {

        if(!email || !password ){
            return Alert.alert("Error", "You need to fill in the inputs",[{text:"Ok",onPress :() =>{}},
        ]);

        }
       

        setLoading(true);
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response)=>{
         setLoading(false);

            //first step-> get user id
            const uid=response.user.uid;
            //second step-> create the user profile data
            const userProfileData={
                id:uid,
                email:email,
               
            };
            //third step->create user collection
            const userRef=firebase.firestore().collection('users');
            //fourt step->save it to cloud
            userRef.doc(uid).set(userProfileData);

        }).catch(error=>{
            // console.log("err",error);
            setLoading(false);
            alert(error);
        });
     };

    return (
        <View style={{flex:1,backgroundColor:"#fff"}}>
          
           <View style={styles.form}>
          
           <TextInput onChangeText={(text)=>setEmail(text)} placeholder="Email" style={styles.input} autoCapitalize="none"/>
           <TextInput onChangeText ={(text)=>setPassword(text)} placeholder="Password" style={styles.input } secureTextEntry={true}/>
          
           
           <Text> Password must include at least 6 characters</Text>
              
          


            {loading ? ( <ActivityIndicator/>) : (
                <Button onPress={signup} title="Submit" backgroundColor="#ffd700"/> 
            )

            }
              
             
           </View>
           <View style={styles.signupView}>
               <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:20}}>
                <Text>By countinuing,you acceptthe<Text style={{color: "#00fa9a", fontWeight:"bold"}}>Terms of Use<Text style={{color:"black"}}> and<Text style={{color:"#00fa9a"}}> Privacy policy</Text></Text></Text></Text>

               </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginHorizontal:50,
        marginTop:80
    },
    input:{
        height:40,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginBottom:20,

    },
    signupView:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",

    },
});
