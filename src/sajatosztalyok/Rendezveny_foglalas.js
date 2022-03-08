import React, { Component } from 'react';
import { StyleSheet, View,Text,FlatList} from 'react-native';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
     
      this.state ={
        dataSource:[],
       

        }
    
    
  }

  componentDidMount(){
    fetch('http://localhost:8080/rendezveny')
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
        <View style={styles.container}>
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={{borderWidth:1,borderRadius:10,padding:10,width:330,marginLeft:13,paddingLeft:15,backgroundColor:"lightblue",margin:10}}>
            <Text style={{fontSize:20,padding:3,color:"white"}}>{item.felhasznalo} </Text>
            <Text style={{fontStyle:"italic",fontSize:15,padding:3}}>{item.telefon} </Text>
            <Text style={{fontSize:12}}>{item.email} </Text>
            <Text style={{fontSize:12}}>{item.idopont} </Text>
          </View>
        }
          keyExtractor={({rendezveny_id}, index) => rendezveny_id}
        />
        
        

      </View>

);
}
}

const styles = StyleSheet.create({
    container: {
     justifyContent: 'center',
      margin:10
    },szovegdoboz:
    {
      padding:10,
      borderWidth:1,
      borderRadius:10,
      marginBottom:5,
      width:250,
      height:30,
      backgroundColor:"white",
       marginLeft:"auto",
       marginRight:700
    }
  });