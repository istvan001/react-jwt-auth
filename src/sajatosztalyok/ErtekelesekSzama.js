import React, { Component } from 'react';
import { Button, StyleSheet, View,Text,TextInput, TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        dataSource:[]
        }
    
    
  }

  componentDidMount(){
    fetch('http://localhost:8080/ertekelesdb')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: responseJson,
       }, function(){
       });
     })
     .catch((error) =>{
       console.error(error);
     });

  }

 

  render() {

        
    
    return (
        <View>
       <FlatList
        data={this.state.dataSource}
        renderItem={({item})=>
        <View>
        <Text style={{ padding: 5,fontSize:17}}>{item.nev}</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.db}</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.atlag}</Text>
        </View>
    
    
    
    }
        keyExtractor={({Etterem_id}, index) => Etterem_id}
      />

       </View>

       




       
        

        
        







    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  szovegdoboz2:
     {padding:10,
       borderWidth:1,
       borderRadius:10,
       width:200,

       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     },
     gomb1:{
       
        marginTop:5,
        marginBottom: 10,
        width: 200,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor:"black",
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 1,
        textAlign:"center"
     
       },
     card: {
        padding: 10,
        margin: 10,
        marginBottom: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth:1,
        borderRadius:10,
  
       
        
      }
});