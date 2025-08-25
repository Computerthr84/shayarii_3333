import { View, Text, Button, StyleSheet } from "react-native";

export default function Home() {
  const handleLogout = () => {
    alert("Logout clicked (auth removed)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to Home</Text>
      <View style={styles.navBar}>
        <Button title="Logout" color="#ff4444" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  navBar: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
