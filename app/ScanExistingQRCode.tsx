import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ScanExistingQRCode from "@/components/ScanExistingQRCode";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View, TextInput } from "react-native";

// import { BarCodeScanner } from "expo-barcode-scanner";
// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";

interface BarCodeScannedEvent {
  type: string;
  data: string;
}

export default function ScannerScreen() {
  const route: any = useRoute();
  const { text } = route.params;
  const navigation = useNavigation();
  // const [text, setText] = useState("");
  console.log("==============", text);
  return <ScanExistingQRCode text={text} />;
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
  textArea: {
    height: 100,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#f9f9f9",
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
});
