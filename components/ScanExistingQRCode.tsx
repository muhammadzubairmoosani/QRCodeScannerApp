import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QRCodeScanner from "@/components/QRCodeScanner";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, ToastAndroid, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// import { BarCodeScanner } from "expo-barcode-scanner";
// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";

interface BarCodeScannedEvent {
  type: string;
  data: string;
}

export default function ScannerScreen({ text }: { text: string }) {
  // const route: any = useRoute();
  // const { text } = route.params;
  console.log("====== ScannerScreen", text);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation = useNavigation();

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannedEvent) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    try {
      const response = await fetch(
        `http://192.168.100.251:3000/data?text=${text}`
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.length) {
        if (
          result[0].text === text &&
          result[0].data === data &&
          result[0].type === type
        ) {
          console.log("QR Code Matched!");
          ToastAndroid.show("QR Code Matched!", ToastAndroid.LONG);
        } else {
          console.log("QR Code Not Match");

          ToastAndroid.show("QR Code Not Match", ToastAndroid.LONG);
        }
      }
      console.log("=======", result);

      console.log("Data retrieved:", result);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // if (hasPermission === null) {
  //   return (
  //     <View style={styles.homeContainer}>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={getBarCodeScannerPermissions}
  //       >
  //         <Text style={styles.buttonText}>Search existing</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={getBarCodeScannerPermissions}
  //       >
  //         <Text style={styles.buttonText}>Add New</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttons2}
          onPress={() => navigation.navigate("index")}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 18,
    borderRadius: 8,
    textAlign: "center",
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    padding: 15,
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
    width: "50%",
  },
});
