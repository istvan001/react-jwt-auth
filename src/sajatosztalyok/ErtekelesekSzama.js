import React, { Component } from 'react';
import { StyleSheet, View,Text,FlatList} from 'react-native';

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
       
       

<View style={{flex: 1, alignItems: "center"}}>
<FlatList
  data={this.state.dataSource}
  renderItem={({item}) => 
<View> 
  <View style={styles.card}>
    
      <Text style={styles.title}>Étterem neve:{item.nev} </Text>
     
      <Text style={styles.title}>Értékelések száma:{item.db} </Text>
      
      <Text style={styles.title}>Értékelések átlaga:{item.atlag} </Text>
    
  </View>
  </View>

}
keyExtractor={({Etterem_id}, index) => Etterem_id}
numColumns={3}
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