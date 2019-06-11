import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
import I18n from "ex-react-native-i18n";
import { Header, Button } from "react-native-elements";
import axios from "react-native-axios";
import { Col, Row, Grid } from "react-native-easy-grid";
import { URL } from "./constant";
import ModalSelector from "react-native-modal-selector";

import { Constants } from "expo";
import { Form, Item, Input, Label, Picker } from "native-base";
import { black } from "ansi-colors";
class Exchange extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      converted_amount: "",
      amount: "",
      rate: "",
      currency: "",
      errorText: "",
      user_id: navigation.getParam("user_id", ""),
      initialArr: [],
      token: navigation.getParam("token", "")
    };

    axios
      .get(URL + "/rates/" + "?api_token=" + this.state.token)
      .then(response => {
        if (response.data) {
          this.setState({
            initialArr: response.data
          });
        }
      });
  }

  static navigationOptions = () => ({
    title: I18n.t("HomeExchange")
  });

  async onValueChange(country) {
    try {
      axios
        .get(
          URL + "/rate?country=" + country + "&api_token=" + this.state.token
        )
        .then(response => {
          // alert("hello");
          if (response.status == "200") {
            this.setState({ rate: response.data });
          } else {
            alert("Error Occurred!");
          }
        })
        .catch(error => {
          console.log("Api call error:" + error.message);
          alert(error.message);
        });
    } catch (exception) {
      alert(exception);
    }
  }

  Calculate(amount) {
    let ea = amount * this.state.rate;
    this.setState({ converted_amount: ea.toFixed(2) });
  }

  handleClick() {
    if (this.state.currency == "") {
      this.setState({ errorText: "Please Select Currency!" });
    } else if (this.state.converted_amount == "") {
      this.setState({ errorText: "Error Converted Amount!" });
    } else if (this.state.amount.length > 4) {
      this.setState({ errorText: "Only 4 Digits Allowed for Amount!" });
    } else {
      this.props.navigation.navigate("ExchangeForm", {
        converted_amount: this.state.converted_amount,
        amount: this.state.amount,
        currency: this.state.currency,
        order_type: "Exchange",
        user_id: this.state.user_id,
        token: this.state.token
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <Col>
              <Form>
                <ModalSelector
                  data={this.state.initialArr}
                  keyExtractor={item => item.id}
                  labelExtractor={item => item.country}
                  initValue="Select Country!"
                  accessible={true}
                  scrollViewAccessibilityLabel={"Scrollable options"}
                  cancelButtonAccessibilityLabel={"Cancel Button"}
                  onChange={item => {
                    this.setState({ currency: item.country });
                    this.onValueChange(item.country);
                  }}
                >
                  <Item floatingLabel>
                    <Label style={{ textAlign: "left" }}>
                      {I18n.t("FormCountry")}
                    </Label>
                    <Input value={this.state.currency} />
                  </Item>
                </ModalSelector>

                <Item floatingLabel>
                  <Label style={{ textAlign: "left" }}>
                    {I18n.t("FormAmount")}
                  </Label>
                  <Input
                    onChangeText={amount => {
                      this.setState({ amount: amount });
                      this.Calculate(amount);
                    }}
                    keyboardType="number-pad"
                    onFocus={() => {
                      if (this.state.currency == "") {
                        alert("Please Select Currency First!");
                      }
                    }}
                  />
                </Item>
                <Label
                  style={{
                    textAlign: "left",
                    paddingTop: 20,
                    paddingHorizontal: 20
                  }}
                >
                  {I18n.t("ExchangeRate")}:{this.state.rate}{" "}
                </Label>
                <Label
                  style={{
                    textAlign: "left",
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingHorizontal: 20
                  }}
                >
                  {I18n.t("ExchangeAmount")}: {this.state.converted_amount}{" "}
                </Label>
                <Button
                  title={I18n.t("ExchangePay")}
                  buttonStyle={{
                    backgroundColor: "#37A8D1",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                  }}
                  onPress={() => this.handleClick()}
                />
                <Text
                  style={{ textAlign: "center", color: "red", paddingTop: 10 }}
                >
                  {this.state.errorText}
                </Text>
              </Form>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});

export default Exchange;
