import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings will be here (Theme, Backup, Lock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", justifyContent: "center", alignItems: "center", padding: 16 },
  text: { color: "#ddd", textAlign: "center" },
});
