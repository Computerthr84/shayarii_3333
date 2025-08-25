import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import EntryCard from "../components/EntryCard";
import { Ionicons } from "@expo/vector-icons";

type Entry = { id: string; text: string; date: string; category?: string };

const initialData: Entry[] = [
  { id: "1", text: "Raat ki syaahi me likhe alfaaz,\nRanu ki diary me chupte raaz.", date: "Aug 22, 2025", category: "Romantic" },
  { id: "2", text: "Aansu bhi kabhi geet ban jaate hain.", date: "Aug 21, 2025", category: "Sad" },
  { id: "3", text: "Dost wo hote jo chup kar sath dete.", date: "Aug 20, 2025", category: "Dosti" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [entries] = useState<Entry[]>(initialData);

  const categories = ["All", "Romantic", "Sad", "Dosti", "Motivation"];

  const filtered = entries.filter((e) => {
    const matchesQ = !query || e.text.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === "All" || e.category === selectedCategory;
    return matchesQ && matchesCat;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Ranu</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#aaa" />
        <TextInput
          placeholder="Search shayari..."
          placeholderTextColor="#8a8a8a"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.catRow}>
        {categories.map((c) => {
          const active = c === selectedCategory;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.catBtn, active && styles.catBtnActive]}
              onPress={() => setSelectedCategory(c)}
            >
              <Text style={[styles.catText, active && styles.catTextActive]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => <EntryCard text={item.text} date={item.date} />}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 12 },
  title: { color: "#fff", fontSize: 30, fontWeight: "700" },
  searchRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#121212", padding: 10, borderRadius: 12 },
  searchInput: { marginLeft: 8, color: "#fff", flex: 1 },
  catRow: { flexDirection: "row", marginTop: 12, marginBottom: 12 },
  catBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#141414", borderRadius: 999, marginRight: 8 },
  catBtnActive: { backgroundColor: "#222" },
  catText: { color: "#a8a8a8" },
  catTextActive: { color: "#fff", fontWeight: "600" },
});
