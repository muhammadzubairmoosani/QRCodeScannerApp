import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QRCodeScanner from "@/components/QRCodeScanner";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScannerScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  return (
    <View style={styles.homeContainer}>
      <TextInput
        style={styles.textArea}
        placeholder="Type something..."
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("index")}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Image
        source={require("@/assets/images/qr.png")}
        style={{ alignSelf: "center" }}
      />
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
