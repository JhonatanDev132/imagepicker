import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar/>
    <View style={styles.container}>
      <Button title="Escolher foto"/>
      <Image style={{ width: 300, height: 300 }}/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
