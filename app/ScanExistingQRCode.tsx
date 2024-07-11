import ScanExistingQRCode from "@/components/ScanExistingQRCode";
import { useRoute } from "@react-navigation/native";
import React from "react";
export default function ScannerScreen() {
  const route: any = useRoute();
  const { text } = route.params;
  return <ScanExistingQRCode text={text} />;
}
