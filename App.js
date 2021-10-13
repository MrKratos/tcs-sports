import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <View style={styles.container}>
      <Text>TCS - SPORTS!</Text>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="Equipos" component={TeamScreen} options={{ title: 'Equipos' }} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

//change
function TeamScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Team Screen</Text>
    </View>
  );
}


function HomeScreen({ navigation }) {

  const [number, onChangeNumber] = React.useState(null);
  const [number_2, onChangeNumber_2] = React.useState(null);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <SafeAreaView>

        <Text style={styles.text}>Número de jugadores</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber_2}
          value={number_2}
          placeholder="jugadores"
          keyboardType="numeric"
        />

        <Text style={styles.text}>Número de años</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="años"
          keyboardType="numeric"
        />

      </SafeAreaView>

      <Button style={styles.division}
        title="Jugar"
        onPress={() => navigation.navigate('Equipos')}
      />



    </View>
  );
}





//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  division: {
    alignItems: 'rigth',

  },
  button: {
    alignItems: 'left',
    justifyContent: 'left',
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#f22275',
  },
  buttontext: {
    color: '#fff',
    fontSize: 18
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    height: 30,
    margin: 3,
    padding: 10,
  },
});
