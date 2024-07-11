import { StyleSheet } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BarCodeScannedEvent {
  type: string;
  data: string;
}

export default function ScannerScreen({ text }: { text: string }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation = useNavigation();
  const [message, setMessage] = useState<string>("");
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannedEvent) => {
    setScanned(true);
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
        message != "Matched" && setMessage("Matched");
      } else {
        message != "Not Match" && setMessage("Not Match");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
    setTimeout(() => {
      setMessage("");
      setScanned(false);
    }, 2000);
  };
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.buttonGroup}>
        {message ? (
          <View
            style={{
              backgroundColor:
                message === "Matched" ? "lightgreen" : "lightsalmon",
              borderColor: message === "Matched" ? "darkgreen" : "darkred",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <TabBarIcon
              name={"checkmark-circle"}
              style={{ color: message === "Matched" ? "darkgreen" : "darkred" }}
            />
            <Text
              style={{
                color: message === "Matched" ? "darkgreen" : "darkred",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {message}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
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
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonGroup: {
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    minHeight: "100%",
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
    width: "100%",
  },
});
