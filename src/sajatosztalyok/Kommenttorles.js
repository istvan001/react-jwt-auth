import React, { Component } from 'react';
import { Button, StyleSheet, View,Text,TextInput, TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        dataSource:[],
        kereses:""
        }
    
    
  }

  frissit=()=>
  {
    fetch('http://localhost:8080/velemenyek2')
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

  componentDidMount(){
    this.frissit()
  }



    torles=(szam)=>
  {
    alert("Megnyomva")
    let bemenet={
      bevitel1:szam,
      
    }
  
    fetch('http://localhost:8080/torol2' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {
        this.frissit()
  
        alert(szoveg)
      })
      .catch((error) =>{
        console.error(error);
      });       
    }

    Kereses=()=>
  {
    alert("Megnyomva")
    var bemenet={
      bevitel1:this.state.kereses,
      
    }
  
    fetch('http://localhost:8080/kereses' ,{
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      )
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
          <Text style={{fontSize:34}}>A Vélemények törlése:</Text>
        <View style={{borderWidth:1,borderRadius:10,padding: 10,alignItems:"center",borderRadius:20,marginLeft:"auto",marginRight:"auto",width:400}}>
        
       <Text>Kereső mező</Text>
       <TextInput
         style={styles.szovegdoboz2}
         placeholder="Add meg a keresendő szót!"
         onChangeText={(kereses) => this.setState({kereses})}
         
       />
    

       <TouchableOpacity 
       
       onPress={async ()=>this.Kereses()}>
         <View style={{width:200,backgroundColor:"lightgrey",marginTop:10,borderRadius:5}}>
           <Text style={{textAlign:"center",padding:10 }}>Keresés</Text>
         </View>
       </TouchableOpacity>

       </View>

       <FlatList
        data={this.state.dataSource}
        
        renderItem={({item}) =>
         
        <View style={styles.card}>
            <Text style={{ padding: 5,fontSize:17}}>Név:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny_nev}</Text>
            <Text style={{padding: 5,fontSize:17}}>Vélemény:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny}</Text>

          

          <TouchableOpacity style={styles.gomb1} onPress={ ()=>this.torles(item.velemenyid)} >
            Törlés

          </TouchableOpacity>



        
          

        
          
        </View>
        
        }
        keyExtractor={({velemenyid}, index) => velemenyid}
        
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