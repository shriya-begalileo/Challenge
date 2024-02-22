import React, { useEffect, useState } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
export const Products=()=>{
    const [category, setCategory] = useState(); 
    const paramObj = {
        params: {
         category
        },
      };   
    useEffect(()=>{
        axios.get(`https://dummy-server-ipe7.onrender.com/products`,paramObj)
        .then(res=>{
            console.log(res.data)
        }
        )
    })
    return (
    <View >
        <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                    }>
  <Picker.Item label="Electronics" value="electronics" />
  <Picker.Item label="Clothes" value="clothes" />
</Picker>
      </View>
    )
}

  