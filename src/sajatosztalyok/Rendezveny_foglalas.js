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



    //this.storeData([])
    this.getData().then(data0=>{
      console.log(data0)

      this.setState({data:data0})
      

    })
    
    //alert("valami")
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
//------------------------------------------------------------------felvitel 
  felvitel=()=> {
    //alert('You tapped the button!')
    let uj=this.state.data
    if (uj==null)
      uj=[]

    let hanyadik=uj.length;
    uj.push({
      "id":hanyadik+1,
      "feladat":this.state.feladat,
      "datum":this.state.datum,
      "kesz":0
    })

    function custom_sort(a, b) {
      return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
  }
    let rendezett=uj.sort(custom_sort);

    this.setState({data: rendezett     })
    this.storeData(this.state.data)
    alert(JSON.stringify(this.state.data))

  }

  storeData = async (value) =>
   {  try {    const jsonValue = JSON.stringify(value)  
      await AsyncStorage.setItem('@storage_Key', jsonValue) 
     } catch (e) 
     { 
           }}
 

  getData = async () => 
  {  try {   
     const jsonValue = await AsyncStorage.getItem('@storage_Key') 
        return jsonValue != null ? JSON.parse(jsonValue) : null;  
      } catch(e)
       {      }}         

  mindentorles=()=>{
    //alert("mindent töröl")
    this.setState({data:[]})
    this.storeData([])

  }

  pipavalto=()=>{
    this.setState({pipa:!this.state.pipa})
  }


  kesz=(aktid)=>{
    let uj=this.state.data;
    for (let i=0;i<uj.length;i++){
        if (uj[i].id==aktid){
          uj[i].kesz=1-uj[i].kesz;
          break;
        }
    }
    this.setState({data:uj})
    this.storeData(this.state.data)
    alert(JSON.stringify(this.state.data))
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
        style={{backgroundColor:"lightblue",borderRadius:10,marginVertical:5}}
        
        onPress={()=>this.datumkereso()}
        

      >
        
       <AiOutlineSearch  style={{height:50,width:50}}/>
        
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
        onPress={ ()=>this.kesz(item.id)}>
        
        {item.foglalt ? 
        <Text style={{backgroundColor:"grey",borderRadius:10,padding:10,textAlign:"center"}}>Töröl</Text>
          :
        <Text style={{backgroundColor:"orange",borderRadius:10,padding:10,textAlign:"center"}}>Foglalt</Text>
        }
      
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