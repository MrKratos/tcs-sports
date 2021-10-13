import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, size } from 'lodash';
import shortid from 'shortid';


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

    </View>
  );
}

//change
function EquipoScreen({ navigation }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("task empty")
      return
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    }

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

  const saveTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("task empty")
      return
    }
    //setTasks([...tasks, newTask])
    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }


  return (
    <div>
      <h1 alignItems="center">Lista de Equipos</h1>

      <div className="row">
        <div className="col-8">
          {


            size(tasks) == 0 ? (
              <h5>Aun no hay equipos</h5>
            ) : (
              <ul className="list-group">
                {
                  tasks.map((task) => (
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button className="bnt btn-danger btn-sm float-right"
                        onClick={() => deleteTask(task.id)}
                      >Eliminar</button>
                      <button className="bnt btn-warning btn-sm float-right"
                        onClick={() => editTask(task)}

                      >Editar</button>

                      <button className="bnt btn-warning btn-sm float-right">Configurar</button>
                    </li>
                  ))

                }
              </ul>
            )
          }

        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar" : "Agregar"}

          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="fomr-control mb-2"
              placeholder="Ingrese el nombre..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            ></input>
            <button className={editMode ? "bnt btn-dark btn-warning" : "bnt btn-dark btn-block"} type="submit">{editMode ? "Guardar" : "Agregar"}</button>
          </form>
        </div>
      </div>
    </div>





  );
}

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
        <Pressable style={styles.button} onPress={() => navigation.navigate('Equipos')}>
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
    with: 100,

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
});
