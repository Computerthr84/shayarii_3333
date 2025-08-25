import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      const stored = await AsyncStorage.getItem("entries");
      if (stored) setEntries(JSON.parse(stored));
    };
    loadEntries();
  }, []);

  const saveEntries = async (updated: any[]) => {
    setEntries(updated);
    await AsyncStorage.setItem("entries", JSON.stringify(updated));
  };

  const updateEntry = (index: number, field: string, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    saveEntries(updated); // ✅ auto-save
  };

  const addEntry = () => {
    const newEntry = { title: "", desc: "", favorite: false, color: "#1f1f1f", image: null };
    saveEntries([...entries, newEntry]);
    setSelectedIndex(entries.length);
  };

  const pickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      updateEntry(index, "image", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Shayari Notes</Text>

      {/* 🔍 Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="Search shayari..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
      />

      {/* Notes List */}
      <FlatList
        data={entries.filter(
          (e) =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.desc.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedIndex(index)}>
            <View style={[styles.card, { backgroundColor: item.color }]}>
              {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
              <Text style={styles.cardTitle}>{item.title || "Untitled"}</Text>
              <Text style={styles.cardDesc} numberOfLines={3}>
                {item.desc}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ➕ Add new note */}
      <TouchableOpacity style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

      {/* Full Screen Modal */}
      <Modal visible={selectedIndex !== null} animationType="slide">
        {selectedIndex !== null && (
          <View style={[styles.modalContainer, { backgroundColor: entries[selectedIndex].color }]}>
            {/* 🔙 Back Button */}
            <TouchableOpacity onPress={() => setSelectedIndex(null)} style={styles.backBtn}>
              <Text style={{ color: "#fff", fontSize: 18 }}>⬅ Back</Text>
            </TouchableOpacity>

            {/* Title */}
            <TextInput
              style={styles.modalTitle}
              value={entries[selectedIndex].title}
              onChangeText={(txt) => updateEntry(selectedIndex, "title", txt)}
              placeholder="Title"
              placeholderTextColor="#777"
            />

            {/* Description */}
            <TextInput
              style={styles.modalDesc}
              value={entries[selectedIndex].desc}
              onChangeText={(txt) => updateEntry(selectedIndex, "desc", txt)}
              placeholder="Write full shayari..."
              placeholderTextColor="#777"
              multiline
            />

            {/* Image Preview */}
            {entries[selectedIndex].image && (
              <Image source={{ uri: entries[selectedIndex].image }} style={styles.modalImage} />
            )}

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => pickImage(selectedIndex)}>
                <Text style={{ fontSize: 22 }}>🖼 Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateEntry(selectedIndex, "color", "#ffeb3b")}
              >
                <Text style={{ fontSize: 22 }}>🎨 Yellow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateEntry(selectedIndex, "color", "#90caf9")}
              >
                <Text style={{ fontSize: 22 }}>💙 Blue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateEntry(selectedIndex, "color", "#c8e6c9")}
              >
                <Text style={{ fontSize: 22 }}>💚 Green</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  search: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  cardDesc: { fontSize: 15, color: "#333", marginTop: 6 },
  addButton: {
    backgroundColor: "#1e90ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 30 },
  modalContainer: { flex: 1, padding: 20 },
  backBtn: { marginBottom: 15 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#333",
    marginBottom: 10,
  },
  modalDesc: { fontSize: 16, color: "#ddd", flex: 1, textAlignVertical: "top", marginTop: 10 },
  modalImage: { width: "100%", height: 180, borderRadius: 12, marginTop: 10 },
  modalActions: { flexDirection: "row", justifyContent: "space-around", marginTop: 15 },
});
