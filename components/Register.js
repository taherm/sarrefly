import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  I18nManager,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from "react-native";
import { Constants } from "expo";
import { URL } from "./constant";
import { Header, Tile, Divider, Button } from "react-native-elements";
import "@expo/vector-icons";
import axios from "react-native-axios";
import I18n from "ex-react-native-i18n";

export class Register extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
    this.state = {
      username: "",
      password: "",
      email: "",
      country: "",
      address: "",
      civil_id: "",
      mobile: "",
      errorText: ""
    };
  }

  static navigationOptions = () => ({
    title: I18n.t("LoginRegister")
  });

  handleClick() {
    if (this.state.username == "") {
      this.setState({ errorText: "Please Enter Username!" });
    } else if (!this.state.email.includes("@") || this.state.email == "") {
      this.setState({ errorText: "Invalid Email" });
    } else if (this.state.address == "") {
      this.setState({ errorText: "Please Enter Address!" });
    } else if (this.state.civil_id == "") {
      this.setState({ errorText: "Please Enter Civil ID!" });
    } else if (this.state.civil_id.length > 12) {
      this.setState({ errorText: "Enter only 12 Digits for Civil ID" });
    } else if (this.state.mobile == "") {
      this.setState({ errorText: "Please Enter Mobile!" });
    } else if (this.state.mobile.length > 8) {
      this.setState({ errorText: "Enter only 8 Digits for Mobile" });
    } else if (this.state.country == "") {
      this.setState({ errorText: "Please Enter Country!" });
    } else if (this.state.password == "") {
      this.setState({ errorText: "Please Enter Password!" });
    } else {
      try {
        axios
          .post(URL + "/user", {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            country: this.state.country,
            address: this.state.address,
            mobile: this.state.mobile,
            civil_id: this.state.civil_id,
            api_token:
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
          })
          .then(response => {
            if (response.status == "201") {
              alert("Account Created Successfully!");

              this.props.navigation.navigate("Login");
            } else {
              alert("Oops!");
            }
          });
      } catch (exception) {
        alert(exception);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("LoginUserName")}
          onChangeText={username => this.setState({ username })}
          style={{ textAlign: "center", height: 50 }}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("EnterEmail")}
          onChangeText={email => this.setState({ email })}
          style={{ textAlign: "center", height: 50 }}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("FormAddress")}
          onChangeText={address => this.setState({ address })}
          style={{ textAlign: "center", height: 50 }}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("FormCivilID")}
          onChangeText={civil_id => this.setState({ civil_id })}
          style={{ textAlign: "center", height: 50 }}
          keyboardType="number-pad"
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("FormMobile")}
          onChangeText={mobile => this.setState({ mobile })}
          style={{ textAlign: "center", height: 50 }}
          keyboardType="number-pad"
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("FormCountry")}
          onChangeText={country => this.setState({ country })}
          style={{ textAlign: "center", height: 50 }}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("LoginPassword")}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          style={{ textAlign: "center", height: 50 }}
        />

        <Button
          title={I18n.t("LoginRegister")}
          buttonStyle={{
            backgroundColor: "#37A8D1",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={() => this.handleClick()}
        />

        <Text style={{ textAlign: "center", color: "red", paddingTop: 30 }}>
          {this.state.errorText}
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

export default Register;
