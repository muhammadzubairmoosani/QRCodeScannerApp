import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BarCodeScannedEvent {
  type: string;
  data: string;
}

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<{
    type: string;
    data: string;
  }>({ type: "", data: "" });
  const navigation = useNavigation();

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedEvent) => {
    setScanned(true);
    setScannedData({ type, data });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        style={StyleSheet.absoluteFillObject}
      />
      {/* <TouchableOpacity
        style={styles.buttons2}
        onPress={() => setHasPermission(null)}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity> */}

      {/* {scanned && ( */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          disabled={!scanned}
          style={[styles.buttons2, !scanned && styles.buttonDisabled]}
          onPress={() => navigation.navigate("AddNewScreen", { scannedData })}
        >
          <Text style={styles.buttonText}>Use QR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!scanned}
          style={[styles.buttons2, !scanned && styles.buttonDisabled]}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </View>
      {/* )} */}
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
  buttonDisabled: {
    backgroundColor: "#a9a9a9",
    opacity: 0.3,
  },
});
