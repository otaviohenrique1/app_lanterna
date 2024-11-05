import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from "react-native-paper";
import { CameraView, Camera } from 'expo-camera';
import * as Device from 'expo-device';

export default function HomePage() {
  const [temLanterna, setTemLanterna] = useState<boolean>(false);
  const [ligado, setLigado] = useState<boolean>(false);
  const [cameraPermissao, setCameraPermissao] = useState<boolean | null>(null);
  let cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    setTemLanterna(Device.isDevice && Device.brand !== null);
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermissao(status === 'granted');
    })();
  }, []);

  if (cameraPermissao === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão para acessar a câmera...</Text>
      </View>
    );
  }
  if (cameraPermissao === false) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera foi negada.</Text>
      </View>
    );
  }

  if (!temLanterna) {
    return (
      <View style={styles.container}>
        <Text>Este dispositivo não possui suporte para lanterna.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={(ref) => (cameraRef.current = ref)} enableTorch={ligado} />

      <Button
        mode={(ligado) ? "contained" : "outlined"}
        onPress={() => setLigado(!ligado)}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: (ligado) ? "white" : "black"
          }}
        >{(ligado) ? "Ligado" : "Desligado"}</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
