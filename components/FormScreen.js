import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header, Button } from "react-native-elements";

import RadioGroup from "react-native-radio-buttons-group";

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
import { bold } from "ansi-colors";
class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      data: [
        {
          label: "Default value is same as label"
        },
        {
          label: "Value is different",
          value: "I'm not same as label"
        },
        {
          label: "Color",
          color: "green"
        },
        {
          disabled: true,
          label: "Disabled"
        },
        {
          label: "Size",
          size: 32
        }
      ]
    };
  }

  onPress = data => this.setState({ data });

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
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;
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
        <Text style={{ fontWeight: "bold", textAlign: "left" }}>
          Some Bold Text
        </Text>
        <Text style={{ fontWeight: "bold", textAlign: "left" }}>
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
          <Text style={{ fontWeight: "bold", textAlign: "left" }}>
            Some Bold Text
          </Text>
          <Item>
            <Input placeholder="Name" style={{ textAlign: "right" }} />
          </Item>
          <RadioGroup
            style={{ alignContent: "flex-end" }}
            radioButtons={this.state.data}
            onPress={this.onPress}
          />
        </Form>
        <Button
          title="Click Me!"
          buttonStyle={{
            backgroundColor: "#37A8D1",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
        />
      </View>
    );
  }
}

export default FormScreen;
