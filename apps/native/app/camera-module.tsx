import { CameraMode, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Camera, Check, RefreshCcw, X } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function CameraModule() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const router = useRouter();
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri!);
  };

  const renderPicture = () => {
    return (
      <View className="bg-black w-full h-full flex items-center justify-center">
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ flex: 1, marginVertical: 120, width: 300, aspectRatio: 1 }}
        />

        <View className="absolute bottom-10 flex flex-row h-screen items-end justify-around w-full">
          <Pressable
            onPress={() => {
              setUri(null);
              router.back();
            }}
          >
            <View className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <X color="white" />
            </View>
          </Pressable>
          <Pressable onPress={() => setUri(null)}>
            <View className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <RefreshCcw color="black" />
            </View>
          </Pressable>
          <Pressable onPress={() => setUri(null)}>
            <View className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Check color="white" />
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing="back"
        mute={true}
        responsiveOrientationWhenOrientationLocked
      >
        <View className="flex h-screen items-center justify-end">
          <Pressable onPress={takePicture}>
            <View className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Camera color="black" />
            </View>
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },

  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
