import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <View style={styles.container}>
      {/* <Text>TCS - SPORTS!</Text> */}
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Partidos" component={HomeScreen} options={{ title: 'Partidos' }} />
          <Stack.Screen name="Equipos" component={EquipoScreen} options={{ title: 'Equipos' }} />
          <Stack.Screen name="Jugadores" component={PlayerScreen} options={{ title: 'Jugadores' }} />
        </Stack.Navigator>
      </NavigationContainer>

      <View style={styles.separator2} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
      <Image source={require('./assets/logos.png')} 
        style={{ width: '60%', height: 30, marginHorizontal: 80, marginBottom:10}} />
    </View>
  );
}

//change
function EquipoScreen({ navigation }) {
  return (
    <View style={styles.cont1}>
      <Text style={styles.title}>Nombre del Equipo</Text>
      <View style={styles.cont2}>
    
      <TextInput
        style={styles.input}
      />
      </View>
      <View style={styles.cont2}>
      <Pressable style={styles.button}  onPress={() => navigation.navigate('Jugadores')}>
           <Text style={styles.text}>Aceptar</Text>
           
      </Pressable>
      </View>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
      </View>
      
  
  );
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
      <Pressable style={styles.button}  onPress={() => navigation.navigate('Equipos')}>
           <Text style={styles.text}>Aceptar</Text>
           
      </Pressable>
      </View>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );

}

function PlayerScreen({ navigation }) {

  const [number, onChangeNumber] = React.useState(null);
  const [number_2, onChangeNumber_2] = React.useState(null);
  return (
    <View style={styles.cont1}>

      <SafeAreaView>

        <Text style={styles.title}>Nombre</Text>
        <View style={styles.cont2}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber_2}
          value={number_2}
          placeholder="Nombre"
        />
        </View>

        <Text style={styles.title}>Edad</Text>
        <View style={styles.cont2}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Edad"
          keyboardType="numeric"
        />
        </View>

      </SafeAreaView>
      <View style={styles.cont2}>
      <Pressable style={styles.button} >
           <Text style={styles.text}>Aceptar</Text>
           
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
  button: {
    // alignItems: 'right',
    // justifyContent: 'right',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#f22275',
    
    
  },
  buttontext: {
    color: '#fff',
    fontSize: 18
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
  height: 2,
  width: '100%',
  backgroundColor: '#cfcfcf',
  justifyContent: 'center',
},
});
