import React, { Component} from 'react';
import { StyleSheet, View,Text,TextInput,Picker, TouchableOpacity} from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hu from 'date-fns/locale/hu';
import { registerLocale, setDefaultLocale ,CalendarContainer} from  "react-datepicker";
registerLocale('hu', hu)
export default class FetchExample extends Component {

    constructor(props){
      super(props);
      
      this.state ={
        dataSource:[],
        etteremnev:"",
        nev:"",
        telefon:"",
        email:"",
        dt:new Date(),
        
        kecske:[],
        valaszt:1
        
        

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
    alert("sikeres kitöltés")
    this.setState({teljesdat:this.state.dt.getFullYear()+"/"+(this.state.dt.getMonth()+1)+"/"+this.state.dt.getDate()})
    
    
    let bemenet={
      bevitel1:this.state.valaszt,  
      bevitel2:this.state.nev,
      bevitel3:this.state.telefon,
      bevitel4:this.state.email,
      bevitel5:this.state.teljesdat,

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
        this.setState({dt:new Date()})
      })
      .catch((error) =>{
        console.error(error);
      });       
    }
    
    

 

  render() {

    
    const MyContainer = ({ className, children }) => {


      return (
        <div style={{ padding:10,color: "black",margin:10,backgroundColor:'lightblue' }}>
          <CalendarContainer className={className}>
           
            <div style={{margin:2}} >{children}</div>
          </CalendarContainer>
        </div>
      );
    };
    

    return (
        <View style={styles.container}>
         <View style={{flexDirection:"row"}}>
        
        <Text style={styles.label1}>
        Válassza ki az Éttermet:
        </Text>
        <Picker
        selectedValue={this.state.valaszt}
        style={{ height: 30, width: 200 ,textAlign:'center', marginLeft:10,marginBottom:10}}
        onValueChange={(itemValue, itemIndex) => this.setState({valaszt:itemValue})}
      >
        {this.state.dataSource.map((item) => (
          <Picker.Item key={item.id} label={item.nev} value={item.id} />
        ))}
       
       
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
        <Text style={styles.label1} style={{marginRight:10}}>
         Dátum:
        </Text>
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