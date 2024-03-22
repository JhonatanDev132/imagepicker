import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker"

export default function App() {

  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState("");

  /* State de checagem de permissões de uso (através do hook
    useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    /* está função vai fazer um pedido ao usuário para que ele permita, ou não, que o expo use a camera e use a galeria do usuário */
    async function verificaPermissões(){
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissões();
  },[]);

  /* Ao pressionar o botão, executa esta função: */

  const escolherFoto = async () => {
    /* Acessando via ImagePicker a biblioteca para seleção
    de apenas imagens, com recurso de edição habilitado,
    proporção 16, 9 e qualidade total. */
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1
    });

    /* Se o usuário não cancelar a operação, pegamos a imagem e colocamos no state */
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };
  const tirarFoto = async () => {
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };
  console.log(foto);
  return (
    <>
      <StatusBar/>
    <View style={styles.container}>
      <Button onPress={escolherFoto} title="Escolher foto"/>
      <Button onPress={tirarFoto} title="Tirar foto"/>
      
      {foto ? (
        <Image source={{ uri: foto }} style={{ width: 300, height: 300 }}/>
      ) : (
        <Text>Sem Foto!</Text>
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 100,
  },
});
