import { useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { cameraUtils } from './src/utils';

const App = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  const openCamera = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      const response = await Camera.requestCameraPermission();
      setCameraOpen(response === 'authorized');
      return;
    }

    setCameraOpen(true);
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    if (photo) {
      cameraUtils.savePhoto(photo.path);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {cameraOpen && device ? (
        <>
          <Camera
            ref={cameraRef}
            device={device}
            isActive
            photo
            format={device?.formats[device.formats.length - 1]}
            style={{ flex: 1 }}
          />
          <Button title="Tirar Foto" onPress={takePhoto} />
        </>
      ) : (
        <Button title="Abrir Câmera" onPress={openCamera} />
      )}
    </View>
  );
};

export default App;
