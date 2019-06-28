import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button
} from "react-native";
import { Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from "ex-react-native-i18n";

import { Constants } from "expo";
class CashDelivered extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      code: navigation.getParam("code", "no_code"),
      mobile: navigation.getParam("mobile", "no_mobile"),
      name: navigation.getParam("name", "no_name"),
      address: navigation.getParam("address", "no_address"),
      amount: navigation.getParam("amount", "no_amount"),
      latitude: navigation.getParam("latitude", "no_latitude"),
      longitude: navigation.getParam("longitude", "no_longitude"),
      order_type: navigation.getParam("order_type", "no_order_type")
    };
  }

  static navigationOptions = () => ({
    title: I18n.t("MyOrder")
  });

  render() {
    return (
      <View style={styles.container}>
        <Grid style={{ paddingTop: 21, paddingHorizontal: 21 }}>
          <Row>
            <Col>
              <Image source={require("../assets/second.png")} />
              <Text style={{ fontSize: 40, color: "#fff", textAlign: "left" }}>
                {this.state.code}
              </Text>
              <Text style={{ fontSize: 20, color: "#fff", textAlign: "left" }}>
                رقم الكود
              </Text>
            </Col>
          </Row>
          <Row>
            <Col />
          </Row>

          <Row
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,

              marginHorizontal: 20,
              paddingTop: 10
            }}
          >
            <Col
              style={{
                width: 240,
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#e1e4e8",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15
              }}
            >
              <Text>سحب</Text>

              <Text style={{ fontWeight: "bold" }}>
                {this.state.name} : {this.state.amount} KD
              </Text>
              <Text style={{ fontWeight: "bold" }}>{this.state.mobile}</Text>
              <Text style={{ fontWeight: "bold" }}>{this.state.address}</Text>
              <Text />
            </Col>
            <Col
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#e1e4e8",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15
              }}
            >
              {this.state.order_type == "Cash" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Map", {
                      amount: this.state.amount,
                      name: this.state.name,
                      address: this.state.address,
                      latitude: this.state.latitude,
                      longitude: this.state.longitude
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../assets/maps.png")}
                    style={{
                      width: 100,
                      height: 100
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={{ fontSize: 21 }}> Advertisement</Text>
              )}
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#37A8D1"
  }
});

export default CashDelivered;
