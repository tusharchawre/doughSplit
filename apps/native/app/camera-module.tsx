import { CameraMode, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Camera, Check, RefreshCcw, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function CameraModule() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const router = useRouter();
  const [uri, setUri] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<{
    txnName: string;
    amount: string;
  } | null>(null);

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
    try {
      const photo = await ref.current?.takePictureAsync({
        quality: 0.7,
        exif: false,
        imageType: "png",
      });

      if (photo?.uri) {
        setUri(photo.uri);
        console.log(uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Camera Error", "Could not capture the image.");
    }
  };

  const extractDetails = async (imageUri: string) => {
    console.log(imageUri);

    const fileInfo = await FileSystem.getInfoAsync(imageUri);

    if (!fileInfo.exists) {
      console.error("File does not exist at", imageUri);
      return;
    }


    const formData = new FormData();
    formData.append('document', {
      uri: imageUri,
      name: 'receipt.png',
      type: 'image/png', 
    }as any);
  

    try {
      const response = await fetch(
        'https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Token 355dad5efc413bb31bc5b4e7c9c31cf2',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
  
      const result = await response.json();
      const prediction = result.document?.inference?.prediction;
    
      if (prediction) {
        // Extract transaction name (merchant name)
        const txnName = prediction.merchant_name?.value || 'Unknown Merchant';
        
        // Extract total amount
        const amount = prediction.total_amount?.value 
          ? `${prediction.total_amount.value.toFixed(2)}` 
          : 'N/A';
        
        // Update state with extracted details
        setExtractedData({
          txnName,
          amount
        });
  
        console.log('Extracted Details:', { txnName, amount });
      }
    } catch (error) {
      console.error('Upload error:', error);
    }


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
          <Pressable onPress={() => extractDetails(uri!)}>
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
        mode="picture"
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

// Styles
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
});
