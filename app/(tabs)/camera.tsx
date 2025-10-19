import {
  CameraMode,
  CameraType,
  CameraView,
  scanFromURLAsync,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";
import { ThemedIcon } from "@/components/ThemedIcon";
import AddItem from "./addItem";

import { whitelist } from "./whitelist";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isBarcode, setBarcode] = useState<string>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isData, setData] = useState();
  const [isPressed, setPressed] = useState(false);

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
    const photo = await ref.current?.takePictureAsync({
      base64: true,
      quality: 0.4,
    });
  
    if (photo?.base64) {
      setUri(photo.uri);
  
      try {
        const response = await fetch("https://us-central1-food-inventory-app-450214.cloudfunctions.net/analyzeImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: photo.base64 }),
        });
  
        const result = await response.json();
  
        if (result.labels && result.labels.length > 0) {
          console.log("Vision API Labels:", result.labels);
  
          // Make lowercase whitelist for safe comparison
          const lowerWhitelist = whitelist.map(item => item.toLowerCase());
  
          let matchedItem = null;
  
          for (const label of result.labels) {
            const labelDesc = label.description.toLowerCase();
            if (lowerWhitelist.includes(labelDesc)) {
              matchedItem = label.description; // Keep original casing
              break;
            }
          }
  
          if (matchedItem) {
            console.log("Matched item:", matchedItem);
  
            setData({
              product: {
                product_name: matchedItem,
                pnns_groups_1: "",
                expiration_date: "",
              },
            });
          } else {
            alert("No matching food found.");
          }
        } else {
          alert("No labels found.");
        }
      } catch (err) {
        console.error("Error sending image:", err);
        alert("Failed to analyze image.");
      } 
    }
  };
  
  
  

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return(
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
    }
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeout = setTimeout(() => setBarcode(undefined), 2000);
    setTimeoutId(newTimeout);
  }

  const fetchProductDetails = async () => {
    try {
        const url = `https://world.openfoodfacts.net/api/v2/product/${isBarcode}?fields=expiration_date,pnns_groups_1,product_name`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.info(data)
        return data;
    } catch (error) {
        console.error("Error fetching product details:", error, "Barcode:", isBarcode);
        alert(`No item found for barcode: ${isBarcode}.`);
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
          <Pressable onPress={async () => {
            const data = await fetchProductDetails();
            setData(data);
          }} disabled={!isBarcode} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} style={{
            opacity: isBarcode ? (isPressed ? 0.5 : 1) : 0,
          }}>
            <View style={styles.barcodeBtn}>
              <MaterialCommunityIcons name="barcode-scan" size={20} color={Colors['orange'].tint} />
              <Text style={styles.barcodeTxt}>{isBarcode}</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.shutterContainer}>
          <Pressable onPress={() => {}} disabled={!!isData}>
            <AntDesign name="picture" size={32} color="white" />
          </Pressable>
          
          <Pressable onPress={takePicture} disabled={!!isData}>
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

          <Pressable onPress={toggleFacing} disabled={!!isData}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
        {isData && renderAddItem()}
      </CameraView>
    );
  };

  const renderAddItem = () => {
    return (
      <View style={styles.overlayContainer}>
        <ThemedButton style={styles.overlayExit} type="grey" onPress={() => setData(undefined)}>
          <ThemedIcon size={50} name="xmark" type='red' />
        </ThemedButton>
        <View style={styles.overlay}>
          <AddItem itemName={isData.product.product_name} category={isData.product.pnns_groups_1} expiration={isData.product.expiration_date} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isData ? renderAddItem() : (uri ? renderPicture() : renderCamera())}
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors['dark'].background,
    borderRadius: 50,
    paddingHorizontal: 15,
    opacity: .85
  },
  barcodeTxt: {
    color: Colors['orange'].tint,
    fontSize: 20,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: "absolute",
    backgroundColor: 'transparent',
    width: '95%',
    borderWidth: 4,
    borderTopWidth: 0,
    borderRadius: 5,
    borderColor: Colors['dark'].border,
  },
  overlayExit: {
    position: "absolute",
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
    top: 30,
    left: 5
  },
  pressed: {
    opacity: 0.5
  }
});