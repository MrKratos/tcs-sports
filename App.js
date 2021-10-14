import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { Image, TextInput, StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, size } from 'lodash';
import shortid from 'shortid';
import { Input, Text } from 'react-native-elements';



const Stack = createNativeStackNavigator();
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      task: '',
    }
  }
  render() {
    const { value1, value2 } = this.state;

    return (
      <View style={styles.container}>
        {/* <Text>TCS - SPORTS!</Text> */}
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: "#f22275" }, headerTitleStyle: { fontSize: 20 }, headerTitleAlign: "center", headerTintColor: "#fff" }}  >
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
function EquipoScreen({ navigation }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")


  const addTask = (task) => {


    const newTask = {
      id: shortid.generate(),
      name: task
    }
    console.log(task)
    setTasks([...tasks, newTask])
    setTask("")
  }


  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task =>
      task.id != id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  const saveTask = () => {

    //setTasks([...tasks, newTask])
    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }



  return (
    <View style={styles.cont1}>

      <View>
        <Text h1>Lista de Equipos</Text>
        <View>
          <Text h4>   {editMode ? "Modificar" : "Agregar"}</Text>



          <TextInput
            placeholder="Ingrese el nombre..."
            style={styles.input}
            onChangeText={(text) => { this.setState({ task: text }) }}
            value={task}
          />

          <Button
            title={editMode ? "Guardar" : "Agregar"}
            onPress={() => { editMode ? saveTask(task) : addTask(task) }}
          />

        </View>
        <View>
          <View>

            {
              size(tasks) == 0 ? (
                <Text style={styles.textList}>Aun no hay equipos</Text>

              ) : (

                tasks.map((task) => (
                  <View key={task.id}>

                    <Text style={styles.item}>{task.name}</Text>
                    <Pressable>
                      <TouchableOpacity style={styles.buttonList} onPress={() => deleteTask(task.id)} >
                        <Text style={styles.textList}>Eliminar</Text>
                      </TouchableOpacity>
                    </Pressable>


                    <Pressable>
                      <TouchableOpacity style={styles.buttonList} onPress={() => editTask(task)} >
                        <Text style={styles.textList}>Editar</Text>
                      </TouchableOpacity>
                    </Pressable>

                    <Pressable>
                      <TouchableOpacity style={styles.buttonList} onPress={() => navigation.navigate('Jugadores')} >
                        <Text style={styles.textList}>Jugadores</Text>
                      </TouchableOpacity>
                    </Pressable>
                  </View>
                )))}
          </View>
        </View>
      </View>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [number_2, onChangeNumber_2] = React.useState(null);
  return (
    <View style={styles.cont1}>

      <SafeAreaView>
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
  xbutton: {

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
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  }

});


export default App;