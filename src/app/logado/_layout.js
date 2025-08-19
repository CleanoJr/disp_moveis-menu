import { Tabs, useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from "react-native";

export default function Layout() {
  const router = useRouter();
  return (

 <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
      
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="products" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Produtos',
            title: 'Produtos',
            drawerIcon: ({ color }) => (
              <FontAwesome name="amazon" size={24} color={color} />
            ),
            headerRight: () => (
      <TouchableOpacity
        onPress={() =>  {
          router.replace( "/logado/newproduct" )}} // Volta para a tela anterior
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    ),
        
          }}
        />
         <Drawer.Screen
          name="newproduct" // This is the name of the page and must match the url from root
          initialParams={{refreshKey: Date.now()}} // Passando o refreshKey inicial
          options={{
            drawerLabel: 'Novo Produtos',
            title: 'Novo Produtos',
            drawerItemStyle: { display: 'none' },
            drawerIcon: ({ color }) => (
              <FontAwesome name="address-book" size={24} color={color} />
            ),
          }}
        />
         <Drawer.Screen
          name="editproduct" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Editar Produtos',
            title: 'Editar Produtos',
            drawerItemStyle: { display: 'none' },
            drawerIcon: ({ color }) => (
              <FontAwesome name="address-book" size={24} color={color} />
            ),
             headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          router.replace( "/logado/products" )} }// Volta para a tela anterior
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    ),
          }}
        />
         <Drawer.Screen
  name="vendas"
  options={{
    drawerLabel: 'Vendas',
    title: 'Área de Vendas',
    drawerIcon: ({ color }) => (
      <FontAwesome name="shopping-cart" size={24} color={color} />
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          router.replace("/logado/vendas")
        }}
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    ),
  }}
/>

      </Drawer>
      
    </GestureHandlerRootView>
  );


}
