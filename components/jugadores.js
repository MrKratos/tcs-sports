import React, { useState } from 'react';
import { Image, TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Pressable, FlatList, Alert, Platform, ListView, TouchableHighlight } from 'react-native';


class PlayerScreen extends React.Component {
 
   constructor(props) {
   super(props);
   this.array = [{ title: 'ONE', id: '1' }, { title: 'TWO', id: '2' }, { title: 'THREE' , id: '3'}],
 
   this.state = {
    text: '',
    lista: [],
    dataSource: '',
  };
 }


 añadirItem() {
    const { i: val } = this.state;
    this.array.push({title : this.state.textInput_Holder, id : this.state.i});
    this.setState({ arrayHolder: [...this.array] });
    this.setState({ i: val + 1  });

    if (this.state.text != '') {
        

      this.state.lista[this.state.lista.length] = this.state.text
      const ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({dataSource: ds.cloneWithRows(this.state.lista)});
      this.setState({text: ''});
    }
  }
eliminarItem(item) {
    for(var i = 0; i<this.state.lista.length; i++) {
        if (this.state.lista[i] == item) {
           delete this.state.lista[i];
           break;
        }
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(this.state.lista)});
  }

render(){


    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.añadirItem()}>
            <Text style={styles.textButton}>Añadir</Text>
          </TouchableHighlight>
        </View>
        {this.state.dataSource != '' && <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.listItem}>
              <TouchableHighlight
                style={styles.buttonItem}
                onPress={() => this.eliminarItem(rowData)}>
                <Text style={styles.textButton}>Eliminar</Text>
              </TouchableHighlight>
              <Text style = {styles.textItem}>{rowData}</Text>
            </View>}
        />}
      </View>
      );
    }

}
  //styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      header: {
        flexDirection: 'row',
      },
      input: {
        marginLeft: 10,
        marginTop: 10,
        width:250,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
      },
      button: {
        alignItems: 'center',
        width: 70,
        height: 40,
        backgroundColor: '#79D0FF',
        borderRadius: 2,
        marginLeft: 10,
        marginTop: 10
      },
      textButton:{
        marginTop: 10,
      },
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        height: 70,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      buttonItem: {
        alignItems: 'center',
        width: 70,
        height: 40,
        backgroundColor: '#FF7979',
        borderRadius: 2,
        marginLeft: 10,
      },
      textItem: {
        marginLeft: 30,
      }
  
  });
  export default PlayerScreen;
  