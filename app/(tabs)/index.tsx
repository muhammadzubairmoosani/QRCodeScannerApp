import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QRCodeScanner from "@/components/QRCodeScanner";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  // return <QRCodeScanner />;
  return (
    <View style={styles.homeContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SearchQRCodeScreen")}
      >
        <Text style={styles.buttonText}>Search existing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={getBarCodeScannerPermissions}
        onPress={() => navigation.navigate("ScannerScreen")}
      >
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
  // return (
  //   <ParallaxScrollView
  //     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
  //     headerImage={
  //       <Image
  //         source={require("@/assets/images/partial-react-logo.png")}
  //         style={styles.reactLogo}
  //       />
  //     }
  //   >
  //     <ThemedView style={styles.titleContainer}>
  //       <ThemedText type="title">Welcome!</ThemedText>
  //       <HelloWave />
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 1: Try it</ThemedText>
  //       <ThemedText>
  //         Edit{" "}
  //         <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
  //         to see changes. Press{" "}
  //         <ThemedText type="defaultSemiBold">
  //           {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
  //         </ThemedText>{" "}
  //         to open developer tools.
  //       </ThemedText>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 2: Explore</ThemedText>
  //       <ThemedText>
  //         Tap the Explore tab to learn more about what's included in this
  //         starter app.
  //       </ThemedText>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
  //       <ThemedText>
  //         When you're ready, run{" "}
  //         <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
  //         to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
  //         directory. This will move the current{" "}
  //         <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
  //         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
  //       </ThemedText>
  //     </ThemedView>
  //   </ParallaxScrollView>
  // );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
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
    justifyContent: "space-between",
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
