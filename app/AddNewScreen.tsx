import { Image, Platform, StyleSheet, ToastAndroid } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScannerScreen() {
  const route: any = useRoute();
  const { scannedData } = route.params;
  const navigation = useNavigation();
  const [text, setText] = useState("");

  const postData = async () => {
    try {
      const response = await fetch("http://192.168.100.251:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...scannedData, text }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      navigation.navigate("index");
      ToastAndroid.show("QR Code Added", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
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
          <TouchableOpacity style={styles.button} onPress={postData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <Image
            source={require("@/assets/images/qr.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    // paddingHorizontal: 10,
  },
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
