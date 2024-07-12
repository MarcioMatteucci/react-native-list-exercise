import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Main from "./components/Main";

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});

export default App;
