import React, { useState } from 'react';
import { Image, TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Pressable, FlatList, Alert } from 'react-native';



class EquipoScreen extends React.Component {
 
   constructor(props) {
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


  return (
 
    <View style={styles.MainContainer}>

      <TextInput
        placeholder="Ingrese un nuevo equipo"
        onChangeText={data => this.setState({ textInput_Holder: data })}
        style={styles.textInputStyle}
        
      />

      <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >

        <Text style={styles.text}> Aceptar </Text>

      </TouchableOpacity>

      <FlatList



        data={this.state.arrayHolder}

        width='100%'

        extraData={this.state.arrayHolder}

        keyExtractor={(index) => index.toString()}

        ItemSeparatorComponent={this.FlatListItemSeparator}

        renderItem={({ item }) => <Text style={styles.item} onPress={this.GetItem.bind(this, 'Nombre= '+item.title +' id= '+ item.id)}  >
        
        <Pressable>
          <TouchableOpacity style={{
          width:40, 
          height:40, 
          backgroundColor:'red', 
          justifyContent: 'center',
          marginTop: 10,
          marginBottom:-10,
          margin:-15,
          marginEnd:50,
          marginStart:1,
          paddingHorizontal: 15,
          borderRadius: 30,
          elevation: 3,}}>
            <Text style={styles.text}>x</Text>
          </TouchableOpacity>
        </Pressable>
        {item.title}  <Text style={styles.text}>     </Text>
        
        
     </Text>}
        
      />


    </View>
 
);
}

}
  //styles
const styles = StyleSheet.create({
    MainContainer: {
 
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2,
        paddingHorizontal:30,
        backgroundColor:"#fff",
     
      },
      
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //justifyContent: 'center',
  
    },
  
  
    item: {
      marginEnd:50,
          marginStart:10,
      //padding: 10,
      paddingTop:15,
      //margin:10,
      marginTop:15,
      fontSize: 18,
      height: 44,
      color: '#252626',
      
    },
   
    textInputStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize:18,
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: '#f22275',
      borderRadius: 10,
      marginTop: 12
    },
   
  
  
  
    button: {
        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: '#f22275',
        borderRadius: 10,
        marginTop: 10,
        marginBottom:10,
        alignItems: 'center',
      
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
      marginVertical: 25,
      marginHorizontal: 0,
      height: 1,
      width: '100%',
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
  export default EquipoScreen;
  