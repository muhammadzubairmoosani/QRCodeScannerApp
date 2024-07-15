import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScannerScreen({ text }: { text: string }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [bool, setBool] = useState<boolean | null>(null);
  const [result, setResult] = useState<any>(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async (type: any, data: any) => {
    try {
      const response = await fetch(
        `http://192.168.100.251:3000/data?text=${text}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (
        result[0]?.text === text &&
        result[0]?.data === data &&
        result[0]?.type === type
      ) {
        setBool(true);
      } else {
        setBool(false);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const cornerPoints = result?.cornerPoints || [
    { x: 96.5, y: 231 },
    { x: 103.5, y: 484 },
    { x: 258, y: 485 },
    { x: 261, y: 232.5 },
  ];

  const width = Math.abs(cornerPoints[2].x - cornerPoints[0].x);
  const height = Math.abs(cornerPoints[1].y - cornerPoints[0].y);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(result) => {
          setResult(result);
          handleBarCodeScanned(result.type, result.data);
        }}
      >
        <View
          style={{
            ...styles.text,
            position: "absolute",
            left: cornerPoints[0].x,
            top: cornerPoints[0].y,
            width: width,
            height: height,
            borderColor:
              bool == true ? "green" : bool == false ? "red" : "#fff",
          }}
        />
      </CameraView>
      <TouchableOpacity
        style={styles.buttons2}
        onPress={() => navigation.navigate("index")}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
    borderWidth: 4,
  },
  buttons2: {
    backgroundColor: "#1e90ff",
    paddingVertical: 18,
    borderRadius: 8,
    textAlign: "center",
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
