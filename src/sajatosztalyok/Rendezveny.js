import React, { Component } from 'react';
import { StyleSheet, View,Text,TextInput,Picker, TouchableOpacity,Button} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
      let dt=new Date();
  let teljesdat=dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
      this.state ={
        dataSource:[],
        etteremnev:"",
        nev:"",
        telefon:"",
        email:"",
        date:"2016-05-15"

        }
    
    
  }

  componentDidMount(){
    fetch('http://localhost:8080/etterem2')
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
  felvitel= (szam)=>{
    alert("Megnyomva")
    let bemenet={
        bevitel4:this.state.date,
      bevitel1:this.state.nev,
      bevitel2:this.state.telefon,
      bevitel3:this.state.email

    }
  
    fetch('http://localhost:8080/rendezveny' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {
        
  
        alert(szoveg)
        this.setState({nev:""})
        this.setState({telefon:""})
        this.setState({email:""})
      })
      .catch((error) =>{
        console.error(error);
      });       
    }
    

 

  render() {
    
    const [selectedValue, setSelectedValue]=("java")
    
    
    return (
        <View style={styles.container}>
         <View style={{flexDirection:"row"}}>
        
        <Text style={styles.label1}>
        Válassza ki az Éttermet:
        </Text>
        <Picker
        selectedValue={this.state.dataSource}
        style={{ height: 30, width: 200,marginLeft:10,marginBottom:10 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >        
          <Picker.Item label="" />    
         
        
          
      </Picker>


        </View>
        
        <View style={{flexDirection:"row"}}>
        
        <Text style={styles.label1}>
         Név:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg a nevét!"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        /></View>

        <View style={{flexDirection:"row"}}>
        <Text style={styles.label1}>
         Telefonszám:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg a telefonszámát!"
          onChangeText={(telefon) => this.setState({telefon})}
          value={this.state.telefon}
        /></View>

        <View style={{flexDirection:"row"}}>
        <Text style={styles.label1}>
         E-mail:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Kérem adja meg az Email címét!"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        /></View>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.label1}>
         Dátum:
        </Text>
        <DatePicker
      current="2020-07-13"
      minimumDate="2020-02-17"
      maximumDate="2020-07-25"
    />
        </View>

        <TouchableOpacity 
                  onPress={()=>this.felvitel()}>
                    <View style={{width:200,backgroundColor:"lightgrey",marginTop:10,borderRadius:5}}>
                      <Text style={{textAlign:"center",padding:10 }}>Felvitel</Text>
                    </View>
        </TouchableOpacity>
        
        

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