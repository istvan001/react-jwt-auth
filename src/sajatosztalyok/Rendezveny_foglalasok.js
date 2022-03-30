import React, { Component } from 'react';
import { Button, StyleSheet, View,Text, TextInput, TouchableOpacity,FlatList,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hu from 'date-fns/locale/hu';
import { AiOutlineSearch } from "react-icons/ai";
import { registerLocale, setDefaultLocale ,CalendarContainer} from  "react-datepicker";
registerLocale('hu', hu)

export default class ButtonBasics extends Component {
//--------------------------------------------------------------------------konstr
  constructor(props) {
    super(props);
    
    this.state = {

      data: [],
      dataSource:[],

      nev:"",
      dt:new Date(),

      pipa:true,

      show:false



    };
  }
  frissit=()=>
  {
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

  componentDidMount(){
    this.frissit()
    
  }
  szemelykereso =()=>
  
  {
    
    
    let bemenet={
      bevitel1:this.state.nev
      
    }
  
    fetch('http://localhost:8080/szemelykereso' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((adat) => {
       
  
        
        this.setState({
          isLoading: false,
          dataSource: adat,
        }, function(){          
      });
      })
      .catch((error) =>{
        console.error(error);
      });       
    }

    datumkereso =()=>
  
  {
    
    this.state.teljesdat=this.state.dt.getFullYear()+"/"+(this.state.dt.getMonth()+1)+"/"+this.state.dt.getDate()
    alert(this.state.teljesdat)
    let bemenet={
      bevitel1:this.state.teljesdat
      
    }
  
    fetch('http://localhost:8080/datumkereso' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((adat) => {
       
  
        
        this.setState({
          isLoading: false,
          dataSource: adat,
        }, function(){          
      });
      })
      .catch((error) =>{
        console.error(error);
      });       
    }

    torles=(szam)=>
  {
    alert("Megnyomva")
    let bemenet={
      bevitel1:szam,
      
    }
  
    fetch('http://localhost:8080/rendezvenytorles' ,{
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


  

       




 

  

  render() {
    const MyContainer = ({ className, children }) => {


      return (
        <div style={{ padding:10,color: "black",margin:10,backgroundColor:'lightblue' }}>
          <CalendarContainer className={className} >
           
            <div style={{margin:2,position: "relative" }} >{children}</div>
          </CalendarContainer>
        </div>
      );
    };
    
    return (
      <View style={styles.container}>
{/*---------------------------------------------------------------------feladat */}
      <Text style={{padding: 10, fontSize: 30}}>
          Rendezvény foglalások:
        </Text>
        <View style={{flexDirection:"row"}}>
        <TextInput
          style={{height: 40,flex:8,margin:10,borderRadius:10,paddingLeft:10,borderWidth:1}}
          placeholder="Írd be a feladat a keresendő személy nevét!"
          onChangeText={(szoveg) => this.setState({nev:szoveg})}
          value={this.state.nev}
        />
        <TouchableOpacity
        style={{backgroundColor:"lightblue",borderRadius:10,marginVertical:5}}
        onPress={()=>this.szemelykereso()}
        

      >
        
       <AiOutlineSearch  style={{height:50,width:50}}/>
        
      </TouchableOpacity>
      </View>
      

        


<View style={{marginTop:20,marginBottom:10,alignItems:"center"}}>
<Text style={{marginBottom:5,fontSize:20}}>Válaszd ki a dátumot: </Text>
  <DatePicker
        selected={this.state.dt} 
        onChange={(newdate) => this.setState({dt:newdate})}
        locale="hu"
        dateFormat="yyyy/MM/dd"
        showMonthDropdown
      showYearDropdown
      dropdownMode="select"
        calendarContainer={MyContainer}
        withPortal
        portalId="root-portal"
        
       
     
        

         />
         
         </View>

         <TouchableOpacity
        style={{backgroundColor:"lightblue",borderRadius:10,marginVertical:5, alignItems:'center'}}
        
        onPress={()=>this.datumkereso()}
        

      >
        
       <Text style={{fontSize:40}}>Dátum szerint keresés </Text>
        
      </TouchableOpacity>


      
      
{/*------------------------------------------------------------------Feladatok alul */}       
      <FlatList
            data={this.state.dataSource}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
              
              <View style={{margin:10,borderWidth:1,padding:10,borderRadius:10}}>

              <Text style={{fontSize:25}}>Étterem neve: {item.nev}</Text>
              <Text style={{fontSize:15}}>Felhasználó neve: {item.felhasznalo}</Text>
              <Text style={{fontSize:15}}>Felhasználó telefonszáma: {item.telefon}</Text>
              <Text style={{fontSize:15}}>Felhasználó E-mail címe: {item.email}</Text>
              <Text style={{fontSize:15,marginBottom:10}}>Időpont: {item.idopont.split('T')[0]}</Text>



              <TouchableOpacity
        style={{width:120}}
        onPress={ ()=>this.torles(item.rendezveny_id)}>
        
        
        <Text style={{backgroundColor:"grey",borderRadius:10,padding:10,textAlign:"center"}}>Törlés</Text>
        
      
      </TouchableOpacity>
              </View>
              

      
      </View>


            
            )}
            keyExtractor={({rendezveny_id}, index) => rendezveny_id}
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
  mindtor:{
    backgroundColor:"brown",
    textAlign:"center",
    width:150,
    borderRadius:10,
    padding:10,
    marginLeft:"auto",
    marginRight:10,
    marginTop:10,
    color:"white"
}
});