import React, { Component } from 'react';
import { Button, StyleSheet, View,Text, TextInput, TouchableOpacity,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hu from 'date-fns/locale/hu';
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

  valtoztatdate=(event,datum0)=>{
    //alert("barmi")
    this.setState({show:false})
    let dt=new Date();
    dt= datum0   ||  this.state.date;
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
  
    this.setState({date:dt})
    this.setState({datum:teljesdat})


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
          Feladat:
        </Text>
        <View style={{flexDirection:"row"}}>
        <TextInput
          style={{height: 40,flex:8,margin:10}}
          placeholder="Írd be a feladat a keresendő személy nevét!"
          onChangeText={(szoveg) => this.setState({nev:szoveg})}
          value={this.state.nev}
        />
        <TouchableOpacity
        style={{width:30,height:30,backgroundColor:"brown",flex:1,margin:10}}
        onPress={()=>this.szemelykereso()}
      >
        <Text style={{textAlign:"center",color:"white"}}>X</Text>
      </TouchableOpacity>
      </View>

       
        


<View style={{alignItems:"center"}}>
  <DatePicker
        selected={this.state.dt} 
        onChange={(newdate) => this.setState({dt:newdate})}
        minDate={new Date()}
        locale="hu"
        dateFormat="yyyy/MM/dd"
        showMonthDropdown
      showYearDropdown
      dropdownMode="select"
        calendarContainer={MyContainer}
        withPortal
        portalId="root-portal"
       
     
        

         /></View>


      <View style={{flexDirection:"row"}}>
      <View style={{flexDirection:"row",  flex:8,marginLeft:20}}>
      <Checkbox
          style={{color:"black"}}
          value={this.state.pipa}
          onValueChange={()=>this.pipavalto()}
          
        />
        <Text style={{}}> korábbiak</Text>
        </View>
        <TouchableOpacity
        style={{flex:3,zIndex:1}}
        onPress={()=>this.mindentorles()}
      >
        <Text style={styles.mindtor}>Minden törlése</Text>
      </TouchableOpacity>
      </View>

{/*------------------------------------------------------------------Feladatok alul */}       
      <FlatList
            data={this.state.dataSource}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
              { this.state.pipa || !item.kesz 
                ?
              <View style={{margin:10,borderWidth:1,padding:10}}>

              <Text style={{fontSize:25}}>Étterem neve: {item.nev}</Text>
              <Text style={{fontSize:15}}>Felhasználó neve: {item.felhasznalo}</Text>
              <Text style={{fontSize:15}}>Felhasználó telefonszáma: {item.telefon}</Text>
              <Text style={{fontSize:15}}>Felhasználó E-mail címe: {item.email}</Text>
              <Text style={{fontSize:15}}>Időpont: {item.idopont}</Text>
              <TouchableOpacity
        style={{width:120}}
        onPress={ ()=>this.kesz(item.id)}>
        
        {item.foglalt ? 
        <Text style={{backgroundColor:"grey",borderRadius:10,padding:10,textAlign:"center"}}>Töröl</Text>
          :
        <Text style={{backgroundColor:"orange",borderRadius:10,padding:10,textAlign:"center"}}>Kész</Text>
        }
      
      </TouchableOpacity>
              </View>
              :
              null

      }
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
    margin:5,
    color:"white"
}
});