import React, { Component } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import I18n from "ex-react-native-i18n";
import { URL } from "./constant";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import axios from "react-native-axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  WebView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from "react-native";
import { Header, Button, FormLabel, FormInput } from "react-native-elements";

import RadioGroup from "react-native-radio-buttons-group";

import { bold, black } from "ansi-colors";

class WU extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      country: "",
      value: 0,
      radioprops: [
        {
          label: I18n.t("Form2Kd"),
          value: 2
        },
        { label: I18n.t("Form5Kd"), value: 5 }
      ],
      radioprops2: [{ label: "خزن البيانات", value: 0 }],
      radio_value: "",
      radiovalue2: "",
      receiver_address: "",
      receiver_mobile: "",
      receiver_name: "",
      amount: "",
      civil_id: "",
      order_type: navigation.getParam("order_type", "no_order_type"),
      user_id: navigation.getParam("user_id", ""),
      errorText: "",
      savedData: [],
      radio_status: "",
      token: navigation.getParam("token", "")
    };

    axios
      .get(
        URL +
          "/saved_orders/" +
          this.state.user_id +
          "?api_token=" +
          this.state.token
      )
      .then(response => {
        if (response.data) {
          this.setState({
            savedData: response.data
          });
          // alert(this.state.initialArr.id[0]);
        }
      });
  }

  onPress = data => this.setState({ data });

  static navigationOptions = () => ({
    title: I18n.t("ModeWU")
  });
  onValueChange(value) {
    this.setState({
      country: value
    });
  }

  setSavedvalues(item) {
    this.setState({ receiver_name: item.receiver_name });
    this.setState({ receiver_mobile: item.receiver_mobile });
    this.setState({ receiver_address: item.receiver_address });
    this.setState({ civil_id: item.civil_id });
    this.setState({ country: item.country });
    this.setState({ amount: item.amount });
  }

  handleClick() {
    if (this.state.receiver_name == "") {
      this.setState({ errorText: "Please Enter Receiver Name!" });
    } else if (this.state.receiver_mobile == "") {
      this.setState({ errorText: "Please Enter Receiver Mobile" });
    } else if (this.state.receiver_mobile.length > 8) {
      this.setState({ errorText: "Enter only 8 Digits for Mobile" });
    } else if (this.state.civil_id == "") {
      this.setState({ errorText: "Please Enter Civil ID!" });
    } else if (this.state.civil_id.length > 12) {
      this.setState({ errorText: "Enter only 12 Digits for Civil ID" });
    } else if (this.state.receiver_address == "") {
      this.setState({ errorText: "Please Enter Receiver Address!" });
    } else if (this.state.country == "") {
      this.setState({ errorText: "Please Enter Country!" });
    } else if (this.state.amount == "") {
      this.setState({ errorText: "Please Enter Amount!" });
    } else {
      try {
        axios
          .post(URL + "/orders" + "?api_token=" + this.state.token, {
            user_id: this.state.user_id,
            receiver_name: this.state.receiver_name,
            receiver_mobile: this.state.receiver_mobile,
            receiver_address: this.state.receiver_address,
            amount: this.state.amount,
            country: this.state.country,
            civil_id: this.state.civil_id,
            order_type: this.state.order_type,
            status: "pending",
            saved: this.state.radiovalue2,
            charges: this.state.radiovalue
          })
          .then(response => {
            if (response.status == "201") {
              axios
                .post(
                  URL + "/make_payment" + "?api_token=" + this.state.token,
                  {
                    order_id: response.data,
                    amount: this.state.amount,
                    charges: this.state.radiovalue
                  }
                )
                .then(response => {
                  return this.props.navigation.navigate("Payment", {
                    url: response.data.transaction.url,
                    user_id: this.state.user_id
                  });
                });
            } else {
              alert("Error Occurred!");
            }
          });
      } catch (exception) {
        alert(exception);
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <FormLabel labelStyle={{ textAlign: "left", fontWeight: "bold" }}>
            بيانات المستلم ( بيانات محفوظة)
          </FormLabel>

          <FlatList
            horizontal
            data={this.state.savedData}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "white" }}
            renderItem={({ item }) => (
              <Button
                title={item.receiver_name}
                onPress={() => this.setSavedvalues(item)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
          <FormLabel labelStyle={{ textAlign: "left", fontWeight: "bold" }}>
            بيانات جديدة
          </FormLabel>
          <Form>
            <Label style={{ textAlign: "left", fontSize: 14 }}>
              {I18n.t("FormMessage")}
            </Label>
            <Item floatingLabel>
              <Label style={{ textAlign: "left" }}> {I18n.t("FormName")}</Label>

              <Input
                onChangeText={receiver_name => this.setState({ receiver_name })}
                value={this.state.receiver_name}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{ textAlign: "left" }}>
                {I18n.t("FormMobile")}
              </Label>
              <Input
                onChangeText={receiver_mobile =>
                  this.setState({ receiver_mobile })
                }
                value={String(this.state.receiver_mobile)}
                keyboardType="number-pad"
              />
            </Item>

            <Item floatingLabel>
              <Label style={{ textAlign: "left" }}>
                {I18n.t("FormAddress")}
              </Label>
              <Input
                onChangeText={receiver_address =>
                  this.setState({ receiver_address })
                }
                value={this.state.receiver_address}
              />
            </Item>

            <Picker
              mode="dropdown"
              placeholder={I18n.t("FormCountry")}
              style={{ width: undefined }}
              placeholderStyle={{ color: "black" }}
              selectedValue={this.state.country}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Kuwait" value="kuwait" />
              <Picker.Item label="UAE" value="uae" />
              <Picker.Item label="Saudia Arabia" value="sa" />
              <Picker.Item label="Bahrain" value="bahrain" />
              <Picker.Item label="Qatar" value="qatar" />
              <Picker.Item label="Oman" value="oman" />
            </Picker>

            <Item floatingLabel>
              <Label style={{ textAlign: "left" }}>
                {I18n.t("FormAmount")}
              </Label>
              <Input
                onChangeText={amount => this.setState({ amount })}
                value={this.state.amount}
                keyboardType="number-pad"
              />
            </Item>
          </Form>

          <RadioForm
            radio_props={this.state.radioprops2}
            initial={1}
            onPress={() => {
              this.setState({ radiovalue2: "1" }, () =>
                console.log(this.state.radiovalue2, "this.state.radiovalue2")
              );
            }}
          />

          <RadioForm
            radio_props={this.state.radioprops}
            initial={-1}
            onPress={radiovalue => {
              this.setState({ radiovalue: radiovalue }, () =>
                console.log(this.state.radiovalue)
              );
            }}
          />
          <Button
            title={I18n.t("FormPay")}
            buttonStyle={{
              backgroundColor: "#37A8D1",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            onPress={() => this.handleClick()}
          />

          <Text style={{ textAlign: "center", color: "red", paddingTop: 10 }}>
            {this.state.errorText}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {},
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default WU;
