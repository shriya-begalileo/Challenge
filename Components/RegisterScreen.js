import { useState } from "react"
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default RegisterScreen = ({navigation})=>{

    const [inputs,setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")
    // const [name,setName] = useState("")

    const handleChange = (name,text) =>{
       setInputs((prev)=>({
           ...prev,
           [name]:text
       }))
    }

    const handleRegister = async()=>{
        let userObj = inputs
        try{
             const response = await fetch(`http://localhost:8080/users/register`, {
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
                {text: 'OK', onPress: () => navigation.navigate('Login') },
              ]);
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        
        <SafeAreaView>
            <View style={styles.view}>
                <Text style={styles.text}>Email Id</Text>
                <TextInput style={styles.input} name={'email'} value={inputs.email} onChangeText={(text)=>handleChange('email',text)}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={inputs.password} name={'password'} onChangeText={ (text)=>handleChange('password',text)}></TextInput>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Joining Name</Text>
                <TextInput style={styles.input} name={'email'}  value={inputs.name} onChangeText={ (text)=>handleChange('name',text)}></TextInput>
            </View>
           
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.button} >
                <Text>Register</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )

}


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