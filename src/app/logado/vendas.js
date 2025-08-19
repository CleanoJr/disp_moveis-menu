import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import api from '../../api/axiosConfig'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import React from "react";

const produtosExemplo = [
  { id: "1", nome: "Sofá", preco: 1200 },
  { id: "2", nome: "Mesa", preco: 800 },
  { id: "3", nome: "Cadeira", preco: 200 },
];

export default function Vendas() {
  const {  refreshKey } = useLocalSearchParams();

  const [vendas, setVendas] = useState([
    
  ]);

  const [products, setProducts] = useState([
   
  ]);

 const [refresh, setRefresh] = useState(false)
 const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  const handleItemPress =  (itemId) => {

     router.replace({
      pathname: '/logado/editproduct',
      params: { productId: itemId, refreshKey: Date.now() }, // Parâmetro enviado
    });
    console.log('Item pressionado:', itemId);
    // Navegação ou ação desejada
  };
  

  const handleLongPress = (itemId) => {
    Alert.alert(
      "Confirmar ação", // Título do Alert
      "Tem certeza que deseja excluir este item?", // Mensagem
      [
        {
          text: "Cancelar", // Botão de cancelar
          style: "cancel", // Estilo do botão (opcional)
        },
        {
          text: "Excluir", // Botão de confirmação
          onPress: () => deletaProduto(itemId), // Ação ao confirmar
          style: "destructive", // Estilo para ações destrutivas (iOS)
        },
      ],
      { cancelable: true } // Permite fechar o Alert clicando fora (Android)
    );
  };


  const deletaProduto = (id) => {
    api.delete(`/produtos/delete/${id}`).then((response)=>{
      console.log(response);
      setRefresh(true);
    }).catch((error)=>{
      console.log(error);
    });
  }

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    setTotal(total + produto.preco);
  };

 useEffect(()=>{
  const getData = async ()=>{

    const dados = api.get("/vendas").then(
      (resp)=>{
        setProducts(resp.data.vendas)
        console.log(resp.data.vendas)
        setRefresh(false)
      }
    ).catch ((error)=>{
      console.log(error);
    } ) 
  }

  getData();

 },[refresh,refreshKey])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área de Vendas</Text>
      <StatusBar style="auto" />
      <ScrollView  style={styles.scroll}>
        {products.map((produto, index) =>(
          <TouchableOpacity key={produto.id} style={styles.itens}
          onPress={() => handleItemPress(produto.id)}
          onLongPress={() => handleLongPress(produto.id)}
          >
            <Text> Codigo:  {produto.barCode}</Text>
             <Text>Descrição: {produto.name}</Text>
             <Text>Preço: {produto.price}</Text>

        </TouchableOpacity> ))}
      </ScrollView>
      <Text style={styles.total}>Total: R$ {total}</Text>
      <Text style={styles.titulo}>Carrinho:</Text>
      <FlatList
        data={carrinho}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Text>{item.nome} - R$ {item.preco}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  itens:{
    padding:10,
    borderBottomColor:'#111',
    borderBottomWidth:2
  },
  scroll:{
    flexGrow:1,
    padding:0

  },
  titulo: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  produto: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  total: { fontSize: 18, marginVertical: 10, fontWeight: "bold" },
});
