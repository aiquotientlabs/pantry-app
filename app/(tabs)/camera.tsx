import {
  CameraMode,
  CameraType,
  CameraView,
  scanFromURLAsync,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [isBarcode, setBarcode] = useState<string>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>We need your permission to use the camera</ThemedText>
        <ThemedButton onPress={requestPermission}>
          <ThemedText darkColor="dark" type='defaultSemiBold'>Grant permission</ThemedText>
        </ThemedButton>
      </ThemedView>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri);
    console.log(photo?.uri);
  };

  const recordVideo = async () => {
    if (recording) {
      console.log("end recording");
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    console.log("start recording");
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "barcode" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <ThemedView>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ flex: 1, aspectRatio: 1 }}
        />
        <ThemedButton onPress={() => setUri(null)}>
          <ThemedText darkColor="dark" type='defaultSemiBold'>Take another picture</ThemedText>
        </ThemedButton>
      </ThemedView>
    );
  };

  const handleBarcodeScan = (barcode: string) => {
    if(isBarcode != barcode) {
      setBarcode(barcode);
      fetchProductDetails(barcode);
    }
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeout = setTimeout(() => setBarcode(undefined), 2000);
    setTimeoutId(newTimeout);
  }

  const fetchProductDetails = async (barcode: string) => {
    try {
        const url = `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=expiration_date,pnns_groups_1,product_name`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching product details:", error, "Barcode:", barcode);
    }
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
        barcodeScannerSettings={{
          barcodeTypes: ["upc_a", "upc_e", "ean8", "ean13"],
        }}
        onBarcodeScanned={({ data }) => {
          handleBarcodeScan(data);
        }}
      >
        <View style={styles.barcodeContainer}>
          <Pressable onPress={toggleMode} disabled={!isBarcode} style={{
            opacity: isBarcode ? 1 : 0,
          }}>
            <View style={styles.barcodeBtn}>
              <MaterialCommunityIcons name="barcode-scan" size={20} color={Colors['orange'].tint} />
              <Text style={styles.barcodeTxt}>{isBarcode}</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <MaterialCommunityIcons name="barcode-scan" size={32} color="white" />
            )}
          </Pressable>
          
          {mode === "picture" && 
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View style={[styles.shutterBtnInner]}/>
              </View>
            )}
          </Pressable>
          }
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
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
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
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
    width: 66,
    height: 66,
    borderRadius: 50,
    backgroundColor: "white",
  },
  barcodeContainer: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    alignItems: "center",
  },
  barcodeBtn: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: Colors['dark'].background,
    borderRadius: 50,
    paddingHorizontal: 15,
    opacity: .85
  },
  barcodeTxt: {
    color: Colors['orange'].tint,
    fontSize: 16,
  },
});