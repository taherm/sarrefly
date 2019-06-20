import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  I18nManager
} from "react-native";
import { Constants } from "expo";
import I18n from "ex-react-native-i18n";
import { Header, Tile, Divider, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import Hr from "react-native-hr-component";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import Orders from "./Orders";

export class Home extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
    const { navigation } = this.props;

    this.state = {
      user_id: navigation.getParam("user_id", " "),
      token: navigation.getParam("token", " ")
    };
  }
  static navigationOptions = () => ({
    title: I18n.t("AppName")
  });
  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <Col>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("WU", {
                    order_type: "WU",
                    user_id: this.state.user_id,
                    token: this.state.token
                  })
                }
                style={{ alignItems: "center", paddingTop: 20 }}
              >
                <ImageBackground
                  source={require("../assets/wu.png")}
                  style={{
                    width: 130,
                    height: 110,
                    backgroundColor: ""
                  }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {I18n.t("HomeWestern")}
                </Text>
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Cash", {
                    order_type: "Cash",
                    user_id: this.state.user_id,

                    token: this.state.token
                  })
                }
                style={{ alignItems: "center", paddingTop: 20 }}
              >
                <ImageBackground
                  source={require("../assets/payment.png")}
                  style={{
                    width: 130,
                    height: 110,
                    backgroundColor: ""
                  }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {I18n.t("HomeCash")}
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row>
            <Col>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Exchange", {
                    order_type: "Exchange",
                    user_id: this.state.user_id,
                    token: this.state.token
                  })
                }
                style={{ alignItems: "center", paddingTop: 20 }}
              >
                <ImageBackground
                  source={require("../assets/dollar.png")}
                  style={{
                    width: 130,
                    height: 110,
                    backgroundColor: ""
                  }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {I18n.t("HomeExchange")}
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Hr lineColor="black" width={1} text={I18n.t("UserOrders")} />
          <Row>
            <Orders
              navigation={this.props.navigation}
              user_id={this.state.user_id}
              token={this.state.token}
            />
          </Row>
        </Grid>
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

export default Home;
