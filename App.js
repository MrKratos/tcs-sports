import { StatusBar } from 'expo-status-bar';
import React, { useState, setState } from 'react';
import { Modal, Image, TextInput, StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Pressable, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, isEmpty, size } from 'lodash';
import shortid from 'shortid';
import { Picker } from "@react-native-picker/picker";
import { color } from 'react-native-reanimated';
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
    //global variables
    global.MyVar = [];
    global.teamA = [];
    global.teamB = [];
    global.cont = 0;
    global.players = null;
    global.years = null;

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
// const storeData = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify(value)
//     await AsyncStorage.setItem(key, jsonValue)
//   } catch (e) {
// save error
//   }
// }
// Getdata key
// const getData = async (value) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(value)
//     return await AsyncStorage.getItem(jsonValue)
//   } catch (e) {
// read error
//   }
// }


function EquipoScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(global.MyVar);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  global.years = route.params.datos[0]
  global.players = route.params.datos[1]
  const [team, setTeam] = useState(global.teamA)
  console.log("team" + team)
  const addTask = async (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("task empty")
      return
    }
    if (size([...tasks, newTask]) == 3) {
      //alert("Solo puede configurar dos equipos")      
      setModalVisible(true)
      setTask("")
      return
    }
    global.cont = global.cont + 1
    const newTask = {
      id: global.cont,
      name: task,
      years: route.params.datos[0],
      players: route.params.datos[1],
    }

    setTasks([...tasks, newTask])
    console.log([...tasks, newTask])
    setTask("")

    // storeData('@key1', [...tasks, newTask])

    await AsyncStorage.setItem('@key1', JSON.stringify([...tasks, newTask]))
    const currentUser = await AsyncStorage.getItem('@key1')
    console.log('es' + currentUser)
    global.MyVar = [...tasks, newTask];
  }


  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task =>
      task.id != id)
    global.cont = global.cont -
      +1
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
          //Alert.alert("M.");
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
            <TextInput placeholder="Ingrese el nombre..."
              onChangeText={setTask}
              style={styles.input}
              value={task}
            />
          </View>
          <View>
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
                          onPress={() => navigation.navigate('Jugadores', { names: [task.id, task.name, global.years, global.players, global.teamA] })}
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


function PlayerScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");

  const [total, setTotal] = useState(
    route.params.names[2] - route.params.names[4].filter(task => task.idequipo == route.params.names[0]).map((task) => (
      task.age)).reduce((prev, next) => prev + next, 0));
  const [age, setAge] = useState("");
  //ingreso
  console.log("team as" + route.params.names[4].filter(task => task.idequipo == route.params.names[0]))
  const [tasks, setTasks] = useState(route.params.names[4]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [resultadoPlayer, setResult] = useState(route.params.names[3] - size(
    route.params.names[4].filter(task => task.idequipo == route.params.names[0])));
  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("task empty")
      return
    }

    if (size([...tasks, newTask]) > route.params.names[3]) {
      //alert("Solo puede configurar dos equipos")      
      setModalVisible(true)
      setTask("")
      setAge("")
      return
    }

    const newTask = {
      id: shortid.generate(),
      idequipo: route.params.names[0],
      name: task,
      age: parseInt(age),

    }


    const total = [...tasks, newTask].map((task) => (
      task.age
    ));
    const sumaPrecios = total.reduce((prev, next) => prev + next, 0);

    console.log(total)
    if (route.params.names[2] - sumaPrecios < 0) {
      setModalVisible(true)
      setTask("")
      setAge("")
      return
    }
    setTotal(route.params.names[2] - [...tasks, newTask].filter(task => task.idequipo == route.params.names[0]).map((task) => (
      task.age)).reduce((prev, next) => prev + next, 0))

    // route.params.names[2] - [...tasks, newTask].filter(task => task.idequipo == route.params.names[0]).map((task) => (
    //   task.age)).reduce((prev, next) => prev + next, 0)

    setTasks([...tasks, newTask])
    setResult(route.params.names[3] - size([...tasks, newTask].filter(task => task.idequipo == route.params.names[0])));
    console.log([...tasks, newTask].filter(task => task.idequipo == route.params.names[0]))
    // if (route.params.names[0] == 1) {
    global.teamA = global.teamA.concat(newTask)
    console.log("teamA" + global.teamA)
    // }
    // if (route.params.names[0] == 2) {
    //   global.teamB = [...tasks, newTask]
    // }
    setTask("")
    setAge("")
  }


  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task =>
      task.id != id)
    setTasks(filteredTasks)
    global.teamA = global.teamA.filter(task =>
      task.id != id)
    setResult(route.params.names[3] - size(global.teamA.filter(task => task.idequipo == route.params.names[0])));
    setTotal(route.params.names[2] - global.teamA.filter(task => task.idequipo == route.params.names[0]).map((task) => (
      task.age)).reduce((prev, next) => prev + next, 0))



  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setAge(theTask.age)
    setEditMode(true)
    setId(theTask.id)
  }

  const saveTask = () => {
    //setTasks([...tasks, newTask])
    // const editedTasks = tasks.map(item => item.id === id ? { id, name: task, age: age } : item)
    const editedTasks = (global.teamA.filter(task => task.idequipo == route.params.names[0]).map(item => item.id === id ? { id, name: task, age: parseInt(age), idequipo: route.params.names[0], } : item))
    console.log(editedTasks)
    //Edit list Global
    //global.teamA.filter(task => task.idequipo == route.params.names[0]).map(item => item.id === id ? { id, name: task, age: age } : item)
    global.teamA = global.teamA.filter(task => task.idequipo == route.params.names[0]).map(item => item.id === id ? { id, name: task, age: parseInt(age), idequipo: route.params.names[0], } : item)
    setTasks(editedTasks)
    setTotal(route.params.names[2] - global.teamA.filter(task => task.idequipo == route.params.names[0]).map((task) => (
      task.age)).reduce((prev, next) => prev + next, 0))
    setEditMode(false)
    setTask("")
    setAge("")
    setId("")
  }



  return (
    <View style={styles.cont1}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("M.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalRojo}>
            <Text style={styles.textStyle2}>Faltan {resultadoPlayer} jugadores{"\n"}Maximo {total} años</Text>
            <Pressable
              style={[styles.buttonClose2]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalText2}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Equipo: {route.params.names[1]}</Text>
          <Text style={styles.textList}>Registro de jugadores</Text>
          <View style={styles.cont2}>
            {/* <Text style={styles.title}>   {editMode ? "Modificar" : "Agregar"}</Text> */}
            <TextInput placeholder="Ingrese el nombre..."
              onChangeText={setTask}
              style={styles.input}
              value={task}
            />
          </View>
          <View style={styles.cont2}>

            <TextInput placeholder="Ingrese la edad..."
              onChangeText={setAge}
              style={styles.input}
              value={age}
              keyboardType="numeric"
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
            <Text style={styles.textYearsPlayers}>Numero de años: {total}</Text>
            <Text style={styles.textYearsPlayers}>Numero de jugadores: {resultadoPlayer}</Text>
          </View>

          <View>
            <View >
              {
                size(tasks) == 0 ? (

                  <Text style={styles.textList}>Aun no hay jugadores registrados</Text>

                ) : (
                  tasks.map((task) => (
                    (task.idequipo) == route.params.names[0] ? (
                      <View key={task.id}>
                        <Text style={styles.item}>{task.name}  {task.age}</Text>
                        <View style={styles.botonlinea}>
                          <Button 
                            disabled={true}
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
                    ) : (


                      <Text ></Text>


                    )


                  )
                  ))}
            </View>
          </View>
        </View>
      </ScrollView >

    </View >
  );

}


function HomeScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [number_2, onChangeNumber_2] = React.useState(null);
  const storageAndNavigation = () => {
    if (number === null || number === "" || number_2 === null || number_2 === "") {

      setModalVisible(true)
      return
    } else {
      // storeData('@key1', number)
      // storeData('@key2', number_2)
      console.log(number + "  " + number_2)
      return navigation.navigate('Equipos', { datos: [number, number_2] })
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
            <Text style={styles.modalText}>Debe llenar los campos para continuar</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
      <SafeAreaView>
        <Text style={styles.title}>Número de jugadores</Text>
        <View style={styles.cont2}>
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeNumber_2}
            value={number_2}
            placeholder="# Jugadores"
            keyboardType="numeric"
          /> */}
         
        
        <Picker style={styles.input} onValueChange={ onChangeNumber_2 } value={number_2}>
            <Picker.Item label="5" value= { 5 } />
            <Picker.Item label="6" value= { 6 } />
            <Picker.Item label="7" value= { 7 } />
            <Picker.Item label="8" value= { 8 } />
            <Picker.Item label="9" value= { 9 } />
            <Picker.Item label="10" value= { 10 } />
            <Picker.Item label="11" value= { 11 } />
        </Picker>
</View>
        <Text style={styles.title}>Total de años</Text>
        <View style={styles.cont2}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="# Años"
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
    backgroundColor: "#f22275",
    borderRadius: 30,
  },
  buttonClose2: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: '180%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    color: 'red',
    fontWeight: 'bold',
    height: 40,
    width: 120,
    fontSize: 18,
  },
  input: {
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
    textAlign: 'center',
    color: '#252626',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  textList: {
    padding: 10,
    marginHorizontal: 15,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  textYearsPlayers: {
    textAlign: 'right',
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
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalText2: {
    //marginBottom: 15,
    textAlign: "center",
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18
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
  }, 
  modalVerde: {
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
  }, 
  modalRojo: {
    margin: 20,
    width: '95%' ,
    height: '90%' ,
    backgroundColor: "red",
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
  }, 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.3,
  },
});


export default App;