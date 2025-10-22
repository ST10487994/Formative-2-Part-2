
import React, { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,FlatList,StyleSheet,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
};

// =============================
// HOME SCREEN
// =============================
function HomeScreen({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tonight's Dining Selection</Text>
      <Text style={styles.totalCount}>Total menu items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemPrice}>R {item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No dishes added yet.</Text>
        }
      />
    </View>
  );
}

// =============================
// ADD NEW ITEM SCREEN
// =============================
function AddDishScreen({ onAddDish }: { onAddDish: (dish: MenuItem) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Starters");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name.trim() && price.trim()) {
      const newDish: MenuItem = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        category,
        price,
      };
      onAddDish(newDish);
      setName("");
      setDescription("");
      setCategory("Starters");
      setPrice("");
      alert("Dish added successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const categories = ["Starters", "Mains", "Dessert", "Drinks"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Dish</Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Salmon"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Select Category</Text>
        <View style={styles.categoryButtons}>
          {categories.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.categoryButton,
                category === option && styles.selectedCategoryButton,
              ]}
              onPress={() => setCategory(option)}
            >
              <Text
                style={
                  category === option
                    ? styles.selectedCategoryText
                    : styles.categoryText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="R 0.00"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Short description of the dish"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setName("");
              setDescription("");
              setCategory("Starters");
              setPrice("");
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleAdd}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// =============================
// MAIN APP
// =============================
const Tab = createBottomTabNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#1c1c1c" },
          headerStyle: { backgroundColor: "#1c1c1c" },
          headerTintColor: "#B8860B",
        }}
      >
        <Tab.Screen name="Menu" options={{ title: "View Menu" }}>
          {() => <HomeScreen menuItems={menuItems} />}
        </Tab.Screen>
        <Tab.Screen name="AddDish" options={{ title: "Add Dish" }}>
          {() => <AddDishScreen onAddDish={addMenuItem} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// =============================
// STYLES
// =============================
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#000", // black background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B8860B", // gold
    textAlign: "center",
    marginBottom: 20,
  },
  totalCount: {
    color: "#B8860B",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
  itemCard: {
    backgroundColor: "#111",
    borderColor: "#B8860B",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  itemName: { color: "#B8860B", fontSize: 18, fontWeight: "bold" },
  itemCategory: { color: "#ccc", marginTop: 4 },
  itemPrice: { color: "#00FF99", marginTop: 4 },
  itemDescription: { color: "#ccc", marginTop: 5 },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 50,
  },
  label: {
    color: "#B8860B",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#111",
    color: "white",
    borderColor: "#B8860B",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#B8860B",
  },
  selectedCategoryButton: {
    backgroundColor: "#B8860B",
  },
  categoryText: { color: "#B8860B" },
  selectedCategoryText: { color: "#000", fontWeight: "bold" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: { backgroundColor: "#333" },
  saveButton: { backgroundColor: "#B8860B" },
  cancelText: { color: "white", fontWeight: "bold" },
  saveText: { color: "black", fontWeight: "bold" },
});
