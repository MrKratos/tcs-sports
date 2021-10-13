import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';



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


function TeamScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Team Screen</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Siguiente"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
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

});
