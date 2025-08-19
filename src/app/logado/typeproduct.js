import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import api from '../../api/axiosConfig'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function TypeProducts() {
 const [produtcts, setTypeProducts] = useState([
  
 ]);

 const [refresh, setRefresh] = useState(false)

 useEffect(()=>{
  const getData = async ()=>{

    const dados = api.get("/tipoproduto").then(
      (resp)=>{
        setTypeProducts(resp.data.tipos)
        console.log(resp.data.tipos)
        setRefresh(false)
      }
    ).catch ((error)=>{
      console.log(error);
    } ) 
  }

  getData();

 },[refresh])

  return (
    <View style={styles.container}>
      <Text>Type of Products</Text>
      <Button  title='listar' onPress={ ()=>{
        setRefresh(true)
      }}></Button>

      <Button  title='Novo' onPress={ ()=>{
        router.replace('/logado/newtypeproduct');
      }}></Button>

      <StatusBar style="auto" />
      <ScrollView  style={styles.scroll}>
        {produtcts.map((tipoproduto, index) =>(
          <View key={tipoproduto.id} style={styles.itens}>
             <Text>Descrição: {tipoproduto.descricao}</Text>
        </View> ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itens:{
    padding:10,
    borderBottomColor:'#111',
    borderBottomWidth:2
  },
  scroll:{
    flexGrow:1,
    padding:0

  }

});
