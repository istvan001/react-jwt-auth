import React, { Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image,TouchableOpacity,TextInput} from 'react-native';
import ReactStars from 'react-stars';

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
    frissit=()=>{
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

  componentDidMount(){
    /*fetch('http://localhost:8080/etterem')
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
     });*/
     this.frissit();
    }

    Kereses=()=>
  {
    alert("Megnyomva")
    var bemenet={
      bevitel1:this.state.kereses,
      
    }
  
    fetch('http://localhost:8080/kereses2' ,{
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

    felvitel= (szam)=>{
      alert("Megnyomva")
      let bemenet={
        bevitel1:szam,
        bevitel2:this.state.aktid
      }
    
      fetch('http://localhost:8080/ert_felvi' ,{
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.text())
        .then((szoveg) => {
    
          alert(szoveg)
          
          this.frissit()
        })
        .catch((error) =>{
          console.error(error);
        });       
      }

  


    kattintas=(szam)=>
  {
    alert(szam)
    this.felvitel(szam)
  }

  torles=(szam)=>
  {
    alert("Megnyomva")
    let bemenet={
      bevitel1:szam,
      
    }
  
    fetch('http://localhost:8080/torol' ,{
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
    if(this.state.isLoading){
      return(
        <View style={styles.loading_content}>
          <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
        </View>
      )
    }
    const ratingChanged = (ratings) => {
      alert(ratings)
      this.setState({aktid:ratings})
     
      
      
    }

    
    return (
      <View>
        <Text style={{fontSize:34}}>Éttermek törlése:</Text>
        <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:'center'}}>
      <Text style={{fontSize:64,fontStyle:"italic",margin:10,marginLeft:40}} >Éttermek:</Text>

      <View style={{borderWidth:1,borderRadius:10,padding: 10,alignItems:"center",borderRadius:20,marginLeft:"auto",marginRight:"auto",width:400}}>
        
        <Text>Kereső mező</Text>
        <TextInput
          style={styles.szovegdoboz2}
          placeholder="Add meg az étterem nevét!"
          onChangeText={(kereses) => this.setState({kereses})}
          
        />
     
 
        <TouchableOpacity 
        
        onPress={async ()=>this.Kereses()}>
          <View style={{width:200,backgroundColor:"lightgrey",marginTop:10,borderRadius:5}}>
            <Text style={{textAlign:"center",padding:10 }}>Keresés</Text>
          </View>
        </TouchableOpacity>
 
        </View>
        </View>


      <View style={{alignItems:"center"}}>
      
        <FlatList
        contentContainerStyle={{flexDirection : "row", flexWrap : "wrap", justifyContent:'center', alignItems:'center',}} 
        
        
        data={this.state.dataSource}
        
        renderItem={({item}) =>
         
        <View style={styles.card}>
          <View style={styles.center}>
            <Image style={styles.image} source={{uri: 'http://localhost:8080/'+item.kep}}/>
          </View>
          <Text style={styles.title}>{item.nev}</Text>
          <Text style={styles.label}>Cím: {item.lakcim}</Text>
          <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
          <Text style={styles.label}>Telefon: {item.telefon}</Text>
          <Text style={styles.label1}>Értékelés: {Math.round((item.atlag + Number.EPSILON) * 100) / 100}/5</Text> 
          

          <TouchableOpacity style={styles.gomb} onPress={ ()=>this.torles(item.id)} >
            Törlés

          </TouchableOpacity>



        
          

        
          
        </View>
        
        }
        keyExtractor={({id}, index) => id}
        
      />
       
      </View>
      
      </View>
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
      borderWidth:1,
      borderRadius:10,

     
      
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