import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useState} from 'react'
import api from '../../api/axiosConfig'
import { router } from 'expo-router';


export default function NewTypeProduct() {

  const [descricao, setDescricao] = useState("");

  const saveData = async ()=>{

    const body = {
      descricao: descricao
    }
    console.log(body);

    api.post("/tipoproduto",body).then( (response)=>{
    // console.log(response);
     router.replace("/logado/typeproduct");
    }).catch((error)=>{
      console.log(error);
    });

  } 

  return (
    <View style={styles.container}>
      <Text>Novo Tipo de Produto</Text>
      <Text>Descrição</Text>
      <TextInput placeholder='Descrição' onChangeText={ (e)=>{setDescricao(e)} } 
      style={{  marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}> </TextInput>

      <Button title='Salvar' onPress={()=>{saveData()}}> </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
