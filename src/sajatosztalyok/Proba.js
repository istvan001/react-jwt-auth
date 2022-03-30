import React, { Component } from 'react';
import { Button, StyleSheet, View,Text,TextInput } from 'react-native';
import FileUpload from "./upload"
export default class ButtonBasics extends Component {
  constructor(props){
    super(props);
    this.state ={
      etteremnev:"",
      lakcim:"",
      telefon:"",
      nyitas:""

      }
    }
  

  render() {
    return (
      
      <View >
        <Text style={{fontSize:34,marginBottom:10}} >Étterem Adatok feltölése </Text>
        
        <View style={{flexDirection : "row"}}>
        <Text style={styles.label1}>
         Étterem Néve:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Add meg az étterem nevét!"
          onChangeText={(etteremnev) => this.setState({etteremnev})}
          value={this.state.etteremnev}
        /></View>

        <View style={{flexDirection : "row"}}>
        <Text style={styles.label1}>
         Étterem lakcíme:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Add meg az étterem lakcímét!"
          onChangeText={(lakcim) => this.setState({lakcim})}
          value={this.state.lakcim}
        /></View>

        <View style={{flexDirection : "row"}}>
        <Text style={styles.label1}>
         Étterem telefonszáma:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Add meg az étterem telefonszámát!"
          onChangeText={(telefon) => this.setState({telefon})}
          value={this.state.telefon}
        /></View>
        <View style={{flexDirection : "row"}}>
        <Text style={styles.label1} >
         Étterem nyitvatartási ideje:
        </Text>
        <TextInput
          style={styles.szovegdoboz}
          placeholder="Add meg az étterem nyitva tartási idejét !"
          onChangeText={(nyitas) => this.setState({nyitas})}
          value={this.state.nyitas}
        />
        </View>
        
        

      <FileUpload  etteremnev={this.state.etteremnev} lakcim={this.state.lakcim} telefon={this.state.telefon} nyitas={this.state.nyitas} >
        
      </FileUpload>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  szovegdoboz:
  {
    padding:10,
    borderWidth:1,
    borderRadius:10,
    marginBottom:5,
    width:350,
    height:30,
    backgroundColor:"white",
     marginLeft:"auto",
     marginRight:600
  }
});