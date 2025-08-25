import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const [entry, setEntry] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("entries");
      if (stored) {
        const parsed = JSON.parse(stored);
        setEntries(parsed);
        if (index !== undefined && parsed[index]) {
          setEntry(parsed[index]);
        }
      }
    };
    load();
  }, [index]);

  const toggleFavorite = async () => {
    const updated = [...entries];
    updated[Number(index)].favorite = !updated[Number(index)].favorite;
    setEntries(updated);
    await AsyncStorage.setItem("entries", JSON.stringify(updated));
    setEntry(updated[Number(index)]);
  };

  const deleteEntry = async () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const updated = entries.filter((_, i) => i !== Number(index));
          await AsyncStorage.setItem("entries", JSON.stringify(updated));
          router.back();
        },
      },
    ]);
  };

  if (!entry) return <Text style={{ color: "#fff" }}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.desc}>{entry.desc}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
          <Text style={{ color: entry.favorite ? "yellow" : "white" }}>★ Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: "/editentry", params: { index } })}
        >
          <Text style={{ color: "orange" }}>✏ Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={deleteEntry}>
          <Text style={{ color: "red" }}>🗑 Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  desc: { fontSize: 16, color: "#ddd", marginBottom: 20 },
  actions: { flexDirection: "row", justifyContent: "space-around" },
  button: { padding: 10 },
});
