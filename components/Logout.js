import React, { Component } from "react";
import { View, StyleSheet, TextInput, I18nManager, Text } from "react-native";
import { Constants } from "expo";
import { Header, Tile, Divider, Button } from "react-native-elements";
import "@expo/vector-icons";
import axios from "react-native-axios";

export class Logout extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          rightComponent={{
            icon: "home",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("Language")
          }}
          centerComponent={{
            text: "صرفلي",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => this.props.navigation.openDrawer()
          }}
          backgroundColor="#37A8D1"
        />

        <Text style={{ textAlign: "center", paddingTop: 20 }}>
          You have been logged out!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});

export default Logout;
