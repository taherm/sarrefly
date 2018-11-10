import React, { Component } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import App from "../App";
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default Navigator;
