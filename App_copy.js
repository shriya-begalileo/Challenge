import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Sty, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const mainIngredient = [

    {
      id: 1,
      title: 'Rice',
    },
    {
      id: 2,
      title: 'Flour',
    },
    {
      id: 3,
      title: 'Pulse',
    },
    {
      id: 4,
      title: 'vegitable',
    },
  ];

  type ItemProps = { title: string };
  const subIngredient = ['Milk', 'Spice', 'Sugar', 'Salt', 'Vinager'];
  const [mainIngredient1, setMainIngredient1] = useState();
  const [subIngredient1, setSubIngredient] = useState([]);
  const [lable1, setLabel1] = useState('prepare your dish');
  const [lable2, setLabel2] = useState('');
  
  const Item = ({ title, index }: ItemProps) => {
    console.log(index);
    return (<TouchableOpacity onPress={() => {
      setLabel1("Preparing DIsh");
      setMainIngredient1(mainIngredient[index].title);
    }
    }>
      <View >
        <Text >{title}</Text>
      </View>
    </TouchableOpacity>
    );
  }


  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [count, setcount] = useState(0);

  const handleOnChange1 = () => {
    setCheckbox1(checkbox1 => !checkbox1);
    const newArray = [...subIngredient1];
    newArray.push('Milk')
    setSubIngredient(newArray);
  }
  const handleOnChange2 = () => {
    setCheckbox2(checkbox2 => !checkbox2);
    const newArray = [...subIngredient1];
    newArray.push('sugar')
    setSubIngredient(newArray);
  }

  const handleOnChange3 = () => {
    setCheckbox3(checkbox3 => !checkbox3);
    const newArray = [...subIngredient1];
    newArray.push('Salt')
    setSubIngredient(newArray);
  }

  const handleOnChange4 = () => {
    setCheckbox4(checkbox4 => !checkbox4);
    const newArray = [...subIngredient1];
    newArray.push('Vinager')
    setSubIngredient(newArray);
  }

  const dish = ['pulaw', 'chai', 'palceholder1'];

  handleSubmit = () => {

    const obj = {
      main: mainIngredient1,
      sub: subIngredient1,
      dish: dish[count + 1],
    }

    AsyncStorage.setItem("dishDAta", JSON.stringify(obj)).then();
  }

  const [dishData, setDishDAta] = useState();
  useEffect(() => {
    AsyncStorage.getItem("dishDAta").then(res => res.JSON).then(res => setDishDAta(res));
  }, []);
  return (

    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        <View>
          <Text>{lable1}</Text>

          <FlatList
            data={mainIngredient}
            renderItem={(item) => <Item title={item.item.title} index={item.index} />}
            keyExtractor={item => item.id}
          />
          <Text>MainIngredient- {mainIngredient1}</Text>
          <View>
            <CheckBox value={checkbox1} onChange={handleOnChange1}></CheckBox>
            <Text>Milk</Text>
          </View>

          <View>
            <CheckBox value={checkbox2} onChange={handleOnChange2}></CheckBox>
            <Text>Sugar</Text>
          </View>

          <View>
            <CheckBox value={checkbox3} onChange={handleOnChange3}></CheckBox>
            <Text>Salt</Text>
          </View>

          <View>

            <CheckBox value={checkbox4} onChange={handleOnChange4}></CheckBox>
            <Text>Vinager</Text>
          </View>
          <Text>{dish[count]}</Text>
        </View>
        <Button title='save' onPress={handleSubmit}></Button>
        <View>
          <Text > list of dish u made - </Text>
          <Text> {JSON.stringify(dishData)}</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
