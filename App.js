import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { Modal, Image, TextInput, StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Pressable, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, size } from 'lodash';
import shortid from 'shortid';
//import { Input,  } from 'react-native-elements';



const Stack = createNativeStackNavigator();
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 'ss',
      task: 'aa',
      modalVisible: false,
    }

  }

  render() {

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



// Storage Function key-value
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // save error
  }
}
// Getdata key
const getData = async (value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(value)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // read error
  }
}

function EquipoScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")


  const addTask = (e) => {

    // storeData('@key2', "Izaick")    
    // console.log(getData('@key2'))
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("task empty")
      return
    }
    if (size([...tasks, newTask]) == 3) {
      //      alert("Solo puede configurar dos equipos")
      setModalVisible(true)
      setTask("")
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

  const saveTask = () => {

    //setTasks([...tasks, newTask])
    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }



  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //          Alert.alert("M.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Maximo 2 equipos</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>

      </Modal>

      <ScrollView style={styles.scrollView}>

        <View>
          <Text style={styles.title}>Lista de Equipos</Text>
          <View style={styles.cont2}>
            {/* <Text style={styles.title}>   {editMode ? "Modificar" : "Agregar"}</Text> */}
            <TextInput placeholder="Ingrese el nombre..."
              onChangeText={setTask}
              style={styles.input}
              value={task}
            />
          </View>
          <View>
            {/* <Button 
              title={editMode ? "Guardar" : "Agregar"}
              onPress={(e) => { editMode ? saveTask(e) : addTask(e) }}
            /> */}
            <Pressable  >
              <TouchableOpacity style={styles.buttonxxx} onPress={(e) => { editMode ? saveTask(e) : addTask(e) }} >
                <Text style={styles.text}>   {editMode ? "Modificar" : "Agregar"}</Text>
              </TouchableOpacity>
            </Pressable>

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

                      <View style={styles.botonlinea}>
                        <Button
                          color='#47d170'
                          style={styles.buttonList}
                          title="Jugadores"
                          onPress={() => navigation.navigate('Jugadores')}
                        />


                        <Button
                          color='#479cd1'
                          style={styles.buttonList}
                          title="Editar"
                          onPress={() => editTask(task)}
                        />
                        <Button

                          marginBottom={10}
                          color='#c94c3e'
                          style={styles.buttonList}
                          title="Eliminar"
                          onPress={() => deleteTask(task.id)}
                        />

                      </View>
                    </View>
                  )))}
            </View>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

function HomeScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [number_2, onChangeNumber_2] = React.useState(null);



  const storageAndNavigation = () => {
    console.log(number + " " + number_2)
    if (number === null || number === "" || number_2 === null || number_2 === "") {
      setModalVisible(true)
      return
    } else {
      storeData('@key1', number)
      storeData('@key2', number_2)
      return navigation.navigate('Equipos')
    }

  }

  return (
    <View style={styles.cont1}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Debes llenar los campos para continuar</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
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
          <TouchableOpacity style={styles.buttonxx} onPress={(number, number_2) => storageAndNavigation(number, number_2)} >
            <Text style={styles.text}>Aceptar</Text>
          </TouchableOpacity>
        </Pressable>

      </View>
      <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

    </View>
  );

}

function PlayerScreen({ navigation }) {
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

      <ScrollView style={styles.scrollView}>

        <View>
          <Text style={styles.title}>Lista de Jugadores</Text>
          <View style={styles.cont2}>
            {/* <Text style={styles.title}>   {editMode ? "Modificar" : "Agregar"}</Text> */}
            <TextInput placeholder="Ingrese el nombre..."
              onChangeText={setTask}
              style={styles.input}
              value={task}
            />
          </View>
          <View>
            {/* <Button 
              title={editMode ? "Guardar" : "Agregar"}
              onPress={(e) => { editMode ? saveTask(e) : addTask(e) }}
            /> */}

            <Pressable  >
              <TouchableOpacity style={styles.buttonxxx} onPress={(e) => { editMode ? saveTask(e) : addTask(e) }} >
                <Text style={styles.text}>   {editMode ? "Modificar" : "Agregar"}</Text>
              </TouchableOpacity>
            </Pressable>
          </View>

          <View>
            <View>

              {
                size(tasks) == 0 ? (
                  <Text style={styles.textList}>Aun no hay jugadores registrados</Text>

                ) : (
                  tasks.map((task) => (
                    <View key={task.id}>
                      <Text style={styles.item}>{task.name}</Text>

                      <View style={styles.botonlinea}>

                        <Button
                          color='#47d170'
                          style={styles.buttonList}
                          title="Escanear"
                          onPress={() => navigation.navigate('Jugadores')}
                        />
                        <Button
                          color='#479cd1'
                          style={styles.buttonList}
                          title="Editar"
                          onPress={() => editTask(task)}
                        />


                        <Button
                          color='#c94c3e'
                          style={styles.buttonList}
                          title="Eliminar"
                          onPress={() => deleteTask(task.id)}
                        />
                      </View>
                    </View>
                  )))}
            </View>
          </View>
        </View>
      </ScrollView>

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
  container3: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#fff',
    // marginHorizontal: 20,
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
    //width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#f22275'
  },
  buttonxxx: {
    width: '80%',
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  buttonClose: {
    backgroundColor: "#2196F3",
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
    marginHorizontal: 15,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
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
    backgroundColor: '#f7f7f7',
    fontSize: 24
  },
  botonlinea: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }, textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});


export default App;