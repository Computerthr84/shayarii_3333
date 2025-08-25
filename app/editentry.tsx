import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function EditEntry() {
  const router = useRouter();
  const { index } = useLocalSearchParams<{ index: string }>();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Love");

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem("entries");
      if (stored) {
        const data = JSON.parse(stored);
        if (data[index]) {
          setTitle(data[index].title);
          setDesc(data[index].desc);
          setCategory(data[index].category);
        }
      }
    };
    loadData();
  }, []);

  const updateEntry = async () => {
    const stored = await AsyncStorage.getItem("entries");
    if (stored) {
      const data = JSON.parse(stored);
      data[index] = { title, desc, category }; // overwrite
      await AsyncStorage.setItem("entries", JSON.stringify(data));
      router.back(); // go back to Home
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Shayari</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Shayari"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Sad" value="Sad" />
        <Picker.Item label="Love" value="Love" />
        <Picker.Item label="Friendship" value="Friendship" />
        <Picker.Item label="Motivational" value="Motivational" />
      </Picker>

      <TouchableOpacity style={styles.saveBtn} onPress={updateEntry}>
        <Text style={styles.saveText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontSize: 18 },
});
