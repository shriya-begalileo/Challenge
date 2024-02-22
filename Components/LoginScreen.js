import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = ({navigation})=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState("")
    const [name,setName] = useState('')


    const handleEmailChange = (text)=>{
        
       setEmail(text)
    
    }
    const handlePasswordChange = (text)=>{
        
        setPassword(text)
      }
    const handleNameChange = (text)=>{
      setName(text)
    }

    const StoreData = async()=>{
        const userObject = {
            email,password,name
        }
        console.log(userObject)
       try{
         await AsyncStorage.setItem('profile',JSON.stringify(userObject))
         await AsyncStorage.setItem('flag',JSON.stringify(true))
       }
       catch(error){
          console.log(error)
       }
    }
    
    const pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    
   
    const handleLogin = async()=>{

        const result = email.match(pattern)
        
        console.log(result,'checking pattern')

        if(!email || !password || !name){
            Alert.alert('Input field are required!')

        }
        else if(!email.match(pattern)){
            Alert.alert('Please provide valid email address!')
        }
        else{

            let userObj = {email,password,name}
             
            try{
                const response = await fetch(`http://localhost:8080/users/login`, {
                    method: "POST", 
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userObj),
                  });
                const data = await response.json()
                Alert.alert(data.message, '', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => navigation.navigate('Dashboard',data.user.name) },
                  ]);
            }
            catch(err){
                console.log(err)
            }


            // if(email ==="Dummy@mail.com" && password==="dummy"){
            //     Alert.alert('Login Successful!','',[{text: 'OK', onPress: () => {navigation.navigate('Dashboard',{name})}},])
            //     StoreData() 
            // }else{
            //     Alert.alert('Wrong Credentials!')
            // }
        }
        
        
    }
    return(
        <SafeAreaView>
            <View style={styles.view}>
                <Text style={styles.text}>Email Id</Text>
                <TextInput style={styles.input}  value={email} onChangeText={handleEmailChange}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={handlePasswordChange}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Joining Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={handleNameChange}></TextInput>
            </View>
           
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.button} >
                <Text>Login</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}


export default LoginScreen;

const styles = StyleSheet.create({
    input:{
        height: 50,
        borderWidth: 1,
        borderColor:'lightgray',
        borderRadius:5,
        padding: 10,
    },
    view:{
        padding:20
    },
    text:{
        marginBottom:4
    },
    button:{
        alignItems: 'center',
        backgroundColor: 'skyblue',
        padding: 10,
        width:'60%',
        alignSelf:'center',
        marginTop:20,
        borderRadius:6
    }
})