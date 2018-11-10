import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Header } from "react-native-elements";

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Icon,
  Right
} from "native-base";
class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined };
  }

  static navigationOptions = {
    headerTitle: "form ",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />
    )
  };
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <View>
        <Header
          rightComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{ text: "Form WU", style: { color: "#fff" } }}
          leftComponent={{
            icon: "keyboard-arrow-left",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          backgroundColor="#37A8D1"
        />
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          Some Bold Text
        </Text>
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          Some Bold Text
        </Text>
        <Form>
          <Item>
            <Input placeholder="Name" style={{ textAlign: "right" }} />
          </Item>
          <Item last>
            <Input placeholder="Mobile" style={{ textAlign: "right" }} />
          </Item>
          <Item last>
            <Input placeholder="Civil ID" style={{ textAlign: "right" }} />
          </Item>
          <Item last>
            <Input placeholder="ID" style={{ textAlign: "right" }} />
          </Item>
          <Picker
            mode="dropdown"
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined, alignContent: "flex-start" }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
          </Picker>
        </Form>
      </View>
    );
  }
}

export default FormScreen;
