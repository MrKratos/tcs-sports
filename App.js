import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Pressable, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, size } from 'lodash';
import shortid from 'shortid';
import { LinearGradient } from 'expo-linear-gradient';

import EquipoScreen  from './components/equipos';
import PlayerScreen  from './components/jugadores';

const Stack = createNativeStackNavigator();
class App extends React.Component {
  constructor(props){
    super(props);
    this.array = [{ title: 'ONE', id: '1' }, { title: 'TWO', id: '2' }, { title: 'THREE' , id: '3'}],
 
    this.state = {
 
      arrayHolder: [],
      textInput_Holder: '',
      i: 1,
    }
    this.GetItem = this.GetItem.bind(this);
    
     
  }
 

  componentDidMount() {

    this.setState({ arrayHolder: [...this.array] })
  }
  joinData = () => {
    const { i: val } = this.state;
    
    this.array.push({title : this.state.textInput_Holder, id : this.state.i});
  
    this.setState({ arrayHolder: [...this.array] });
  
    this.setState({ i: val + 1  });
  }
  FlatListItemSeparator = () => {
    return (
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
    );
  }
  GetItem(item) {
  
    Alert.alert(item);
  
  }

  render(){

    const { value1, value2} = this.state;

    return (
    <View style={styles.container}>
      {/* <Text>TCS - SPORTS!</Text> */}
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle:{ backgroundColor: "#f22275" }, headerTitleStyle:{ fontSize:20 }, headerTitleAlign: "center", headerTintColor:"#fff"}}  >
          <Stack.Screen name="Partidos" component={HomeScreen} options={{ title: 'Partidos' }} />
          <Stack.Screen name="Equipos" component={EquipoScreen} options={{ title: 'Equipos' }} />
          <Stack.Screen name="Jugadores" component={PlayerScreen} options={{ title: 'Jugadores' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.separator2} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
        <Image source={require('./assets/logos.png')}
          style={{ width: '60%', height: 30, marginHorizontal: 80, marginBottom: 10 }} />
      </View>
    </View>
  );
}

}

const OnPressPlayer = () => { navigation.navigate('Jugadores'); }


// function PlayerScreen({ navigation }) {

//   return (
//     <View style={styles.container}>
   
      
//       <View style={styles.cont2}>   
//             <Pressable>
//             <TouchableOpacity style={styles.buttonxx} onPress={() => navigation.navigate('Equipos')} >
//                 <Text style={styles.text}>Aceptar</Text>
//             </TouchableOpacity>
//             </Pressable>
//         </View>

//       <TextInput
//         placeholder="Ingrese un nuevo equipo"
//         onChangeText={data => this.setState({ textInput_Holder: data })}
//         style={styles.textInputStyle}
        
//       />

//       <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >

//         <Text style={styles.text}> Aceptar </Text>

//       </TouchableOpacity>

//       <FlatList

//         data={this.state.arrayHolder}
//         width='100%'
//         extraData={this.state.arrayHolder}
//         keyExtractor={(index) => index.toString()}
//         ItemSeparatorComponent={this.FlatListItemSeparator}
//         renderItem={({ item }) => <Text style={styles.item} onPress={this.GetItem.bind(this, 'Nombre= '+item.title +' id= '+ item.id)}  >
      
//         <Pressable>
//           <TouchableOpacity style={{
//           width:40, 
//           height:40, 
//           backgroundColor:'red', 
//           justifyContent: 'center',
//           marginTop: 10,
//           marginBottom:-10,
//           margin:-15,
//           marginEnd:50,
//           marginStart:1,
//           paddingHorizontal: 15,
//           borderRadius: 30,
//           elevation: 3,}}>
//             <Text style={styles.text}>x</Text>
//           </TouchableOpacity>
//         </Pressable>
//         {item.title}  <Text style={styles.text}>     </Text>  
//      </Text>}  />

//     </View>
 
// );
// }




function teams() {
  return (
    <div>
      <h1>Tareas</h1>
      <div>
        <h4>Lista de Tareas</h4>
        <ul>
          <li>
            <span>Nombre del equipo</span>
            <button>Eliminar</button>
            <button>Editar</button>
          </li>
        </ul>
      </div>
    </div>

  )
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
}



function HomeScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [number_2, onChangeNumber_2] = React.useState(null);
  return (
    <View style={styles.cont1}>

      <SafeAreaView>
        {console.log(getData)}

        <Text style={styles.title}>Número de jugadores</Text>
        <View style={styles.cont2}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber_2}
            value={number_2}
            placeholder="Jugadores"
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.title}>Número de años</Text>
        <View style={styles.cont2}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Años"
            keyboardType="numeric"
          />
        </View>

      </SafeAreaView>
      <View style={styles.cont2}>
        <Pressable>
          <TouchableOpacity style={styles.buttonxx} onPress={() => navigation.navigate('Equipos')} >
            <Text style={styles.text}>Aceptar</Text>
          </TouchableOpacity>
        </Pressable>

      </View>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

    </View>
  );

}



//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',

  },


  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
 
  textInputStyle: {
 
    textAlign: 'center',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 12
  },
 



  button: {
    // alignItems: 'right',
    // justifyContent: 'right',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: '#f22275',
    height: 40,
    width: 120,
  },
  buttonxx: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#f22275'
  },
  buttonList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: 100,
    paddingHorizontal: 1,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#f22275'
  },
  buttontext: {
    color: '#fff',
    fontSize: 18
  },
  xbutton:{
    
  },
  input: {

    padding: 10,
    borderWidth: 1,
    borderColor: '#7f8c8d',
    color: '#252626',
    height: 40,
    fontSize: 18,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  title: {
    color: '#252626',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 15,
  },
 textList: {
  fontSize: 13,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
  },
  cont1: {
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',

  },
  cont2: {
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  cont3: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#e4348b'

  },
  cont4: {
    marginTop: -5,
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center',

  },
  cont5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    marginHorizontal: 20,
    height: 1,
    width: '90%',
    backgroundColor: '#7f8c8d',
    justifyContent: 'center',
  },
  separator2: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#cfcfcf',
    justifyContent: 'center',


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2.50,

    elevation: 0,

  },

});


export default App;
