import { useState } from "react"
import { View,Text,SafeAreaView, TextInput, TouchableOpacity, Button } from "react-native"


const Todo = ()=>{
    const [value,setValue]= useState('')
    const [todoList,setTodoList]= useState([])
    const handleSubmit = ()=>{
        console.log('submit')
    }
    return (
        <SafeAreaView>
        <Text>Todo App</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginLeft:10, marginRight:10 }}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
    ></TextInput>
   <Button title="Add Todo" onPress={handleSubmit}/>
        </SafeAreaView>
    )
}

export default Todo