import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function AddEntry() {
  const [text, setText] = useState("");

  const onSave = () => {
    // TODO: save to Firestore later
    alert("Saved locally (mock):\n\n" + text.slice(0, 200));
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Likho dil se..."
        placeholderTextColor="#888"
        multiline
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", padding: 16 },
  input: { flex: 1, backgroundColor: "#111", borderRadius: 12, padding: 16, color: "#fff", textAlignVertical: "top" },
  saveBtn: { marginTop: 12, backgroundColor: "#E94560", padding: 14, borderRadius: 12, alignItems: "center" },
});
