import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultList, setResultList] = useState([]);

  const billContent = [
    'Electric Bill',
    'Water Bill',
    'Gas Bill',
    'Phone Bill',
  ];

  const showList = () => {
    console.log("Input Value:", inputValue);
    
    if (inputValue.trim() !== '') {
      const filteredList = billContent.filter(content =>
        content.toLowerCase().includes(inputValue.toLowerCase())
      );
      console.log("Filtered List:", filteredList);
      setResultList(filteredList);
    } else {
      setResultList([]);
    }
  };

  const handleInputChange = text => {
    setInputValue(text);
  };
 console.log(inputValue,"inpu")
  const handleButtonPress = () => {
    showList();
  };

  return (
    <View style={{marginTop: 30}}>
      <Text style={{marginLeft:10}}>Enter text:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginLeft:10, marginRight:10 }}
        onChangeText={handleInputChange}
        value={inputValue}
        // Remove onSubmitEditing prop if it's not necessary
      />
      <Button title="Submit" onPress={handleButtonPress} />

      <FlatList
        data={resultList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ marginRight: 5, color: 'green' }}>&#10004;</Text>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
