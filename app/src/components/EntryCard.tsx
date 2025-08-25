import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  date: string;
}

const EntryCard: React.FC<Props> = ({ text, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>
        {text}
      </Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151515",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { color: "#F5F5F5", fontSize: 16, lineHeight: 22 },
  date: { color: "#8a8a8a", marginTop: 8, fontSize: 12 },
});

export default EntryCard;
