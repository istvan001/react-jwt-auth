import React, { Component,useState} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image,TouchableOpacity,TextInput } from 'react-native';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        dataSource:[],
        rating:[],
        szam1:1,
        aktid:1,
        aktid2:0,
        iscollapsed:true,
        collapsed:true,
        megnyomva:[],
        megnyomva2:[],
        megnyom:[],
        nev: '',
        velemeny:""
        }
    
    
  }
  componentDidMount(){
    fetch('https://s1.siralycore.hu:8082/etterem')
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
     fetch('https://s1.siralycore.hu:8082/etterem2')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         rating: responseJson,
       }, function(){          
     });
   })
     .catch((error) =>{
       console.error(error);
     });
    }

  render() {
    return (
        <FlatList
        data={this.state.dataSource,(this.state.rating)}
        renderItem={({item}) => 
        <View style={styles.card}>
          <View style={styles.center}>
            <Image style={styles.image} source={{uri: 'https://s1.siralycore.hu:8082/kepek/'+item.kep}}/>
          </View>
          <Text style={styles.title}>{item.nev}</Text>
          <Text style={styles.label}>Cím: {item.lakcim}</Text>
          <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
          <Text style={styles.label}>Telefon: {item.telefon}</Text>
          <Text style={styles.label1}>Értékelés: {item.atlag}/5</Text>    
     
          



        
          

        
          
        </View>
        }
        keyExtractor={({id}, index) => id}
      />
    );
  }
}

const styles = StyleSheet.create({
    loading_content:{
      alignItems: "center",
      padding: 5,
      backgroundColor: "blue",
      height: 40,
      justifyContent: "space-around",
      flexDirection: "row",
    },
    loading:{
      color: "white"
    },
    center:{
      alignItems: "center",
      justifyContent: "center"
    },
    title:{
      textAlign: "justify",
      color: "black",
      fontWeight: "bold",
      fontSize: 18,
      padding: 5
    },
    card: {
      padding: 10,
      margin: 10,
      marginBottom: 10,
      width: 300,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 0.22,
      shadowRadius: 1.22,
      elevation: 1,
    },
    label:{
      padding: 5
    },
    image:{
      width: 200,
      height: 200,
      marginBottom: 10
    },
    image2:{
      width: 50,
      height: 50
    },
    label1:{
     padding: 5,
     fontSize:20
   
    },
    gomb:{
     padding: 10,
      margin: 10,
      marginBottom: 10,
      width: 250,
      height:50,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor:"black",
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 2,
      shadowRadius: 5,
      elevation: 1,
      textAlign:"center"
   
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
     velemeny:
     {
       borderWidth:1,
       borderRadius:10,
       width:270,
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     },
   
     szovegdoboz:
     {
       padding:10,
       borderWidth:1,
       borderRadius:10,
       width:200,
       height:30,
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     },
     szovegdoboz2:
     {padding:10,
       borderWidth:1,
       borderRadius:10,
       width:200,
       height:70,
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     }
   
   });