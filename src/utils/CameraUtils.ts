import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PermissionsAndroid, Platform } from 'react-native';

const checkAndroidPermissions = async () => {
  const androidVersion = parseInt(Platform.Version.toString());
  const permission =
    androidVersion >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const permissionResult = await PermissionsAndroid.request(permission);
  return permissionResult === 'granted';
};

export const savePhoto = async (file: string) => {
  if (Platform.OS === 'android' && !(await checkAndroidPermissions())) {
    return;
  }

  await CameraRoll.save(file, {
    type: 'photo',
    album: 'exemplo-camera',
  });
};

export const getPhotos = async () => {
  const photos = await CameraRoll.getPhotos({
    first: 50,
    after: '',
    assetType: 'Photos',
    groupName: 'exemplo-camera',
  });

  return photos;
};
