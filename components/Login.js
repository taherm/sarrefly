import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  I18nManager,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Constants } from "expo";
import { Header, Button } from "react-native-elements";
import "@expo/vector-icons";
import I18n from "ex-react-native-i18n";

import { URL } from "./constant";
import axios from "react-native-axios";

import { AsyncStorage } from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
    this.state = {
      username: "",
      password: "",
      user_id: "",
      errorText: "",
      token: ""
    };
  }
  static navigationOptions = () => ({
    title: I18n.t("AppName")
  });
  async handleClick() {
    if (this.state.username == "" || this.state.password == "") {
      this.setState({
        errorText: "Please Enter Username and Password!"
      });
    } else {
      try {
        axios
          .get(
            URL +
              "/user?name=" +
              this.state.username +
              "&password=" +
              this.state.password
          )
          .then(response => {
            if (response.data) {
              this.setState({
                user_id: response.data.id,
                token: response.data.api_token
              });
              this.props.navigation.navigate("Home", {
                user_id: this.state.user_id,
                token: this.state.token
              });
            } else {
              alert("Wrong Username or Password!");
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
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("LoginUserName")}
          onChangeText={username =>
            this.setState({
              username
            })
          }
          style={{
            textAlign: "center",
            height: 50
          }}
        />
        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder={I18n.t("LoginPassword")}
          secureTextEntry={true}
          onChangeText={password =>
            this.setState({
              password
            })
          }
          style={{
            textAlign: "center",
            height: 50
          }}
        />
        <Button
          title={I18n.t("LoginSubmit")}
          buttonStyle={{
            backgroundColor: "#37A8D1",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={() => this.handleClick()}
        />
        <Button
          style={{
            paddingTop: 21
          }}
          title={I18n.t("LoginRegister")}
          buttonStyle={{
            backgroundColor: "#37A8D1",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "red",
            paddingTop: 30
          }}
        >
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
