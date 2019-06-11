import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  I18nManager,
  Text,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Constants } from "expo";
import { URL } from "./constant";
import { Header, Tile, Divider, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import "@expo/vector-icons";
import I18n from "ex-react-native-i18n";
import axios from "react-native-axios";
import { blue } from "ansi-colors";

class Orders extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
    const { navigation } = this.props;
    this.state = {
      receiver_name: "",
      order_type: "",
      token: "",
      initialArr: []
    };
    this.props.navigation.addListener("willFocus", payload => {
      axios
        .get(
          URL +
            "/orders/" +
            this.props.user_id +
            "?api_token=" +
            this.props.token
        )
        .then(response => {
          if (response.data) {
            //console.log("test id:-" + response.data.id);
            this.setState({
              initialArr: response.data
            });
            // alert(this.state.initialArr.id[0]);
          }
        });
    });

    // console.log("token in orders:-" + this.props.token);
  }

  onSelect(status) {}

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Grid style={{ paddingTop: 10 }}>
            {this.state.initialArr.map((prop, key) => {
              return (
                <Row
                  style={{
                    paddingTop: 20,
                    paddingHorizontal: 10,

                    marginHorizontal: 20
                  }}
                  key={key}
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
                    <Text>{prop["order_type"]}</Text>

                    <Text style={{ fontWeight: "bold" }}>
                      {prop["receiver_name"]} : {prop["amount"]} KD
                    </Text>
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
                    {prop["order_type"] == "Cash" ? (
                      <Button
                        rounded
                        raised
                        title={I18n.t("OrderTrack")}
                        backgroundColor="green"
                        width="2"
                        onPress={() => {
                          this.props.navigation.navigate("CashDelivered", {
                            code: prop["code"],
                            amount: prop["amount"],
                            name: prop["receiver_name"],
                            address: prop["receiver_address"],
                            mobile: prop["receiver_mobile"],
                            latitude: prop["latitude"],
                            longitude: prop["longitude"],
                            order_type: prop["order_type"]
                          });
                        }}
                      />
                    ) : prop["order_type"] == "WU" ? (
                      <Button
                        rounded
                        raised
                        title={I18n.t("ModeWU")}
                        backgroundColor="yellow"
                        width="2"
                        onPress={() => {
                          this.props.navigation.navigate("CashDelivered", {
                            code: prop["code"],
                            amount: prop["amount"],
                            name: prop["receiver_name"],
                            address: prop["receiver_address"],
                            mobile: prop["receiver_mobile"],
                            order_type: prop["order_type"]
                          });
                        }}
                      />
                    ) : (
                      <Button
                        rounded
                        raised
                        title={I18n.t("OrderCode")}
                        backgroundColor="blue"
                        width="2"
                        onPress={() => {
                          this.props.navigation.navigate("CashDelivered", {
                            code: prop["code"],
                            amount: prop["amount"],
                            name: prop["receiver_name"],
                            address: prop["receiver_address"],
                            mobile: prop["receiver_mobile"],
                            order_type: prop["order_type"]
                          });
                        }}
                      />
                    )}
                  </Col>
                </Row>
              );
            })}
          </Grid>
        </View>
      </ScrollView>
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

export default Orders;
