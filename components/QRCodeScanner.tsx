import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BarCodeScannedEvent {
  type: string;
  data: string;
}

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.homeContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={getBarCodeScannerPermissions}
        >
          <Text style={styles.buttonText}>Search existing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={getBarCodeScannerPermissions}
        >
          <Text style={styles.buttonText}>Add New</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        style={styles.buttons2}
        onPress={() => setHasPermission(null)}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {scanned && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttons2} onPress={() => {}}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons2}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
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
