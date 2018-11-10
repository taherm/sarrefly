import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground
} from "react-native";
import { Constants } from "expo";
import { Header, Tile, Divider, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import "@expo/vector-icons";
import Hr from "react-native-hr-component";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          rightComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => alert("ea")
          }}
          centerComponent={{ text: "صرفلي", style: { color: "#fff" } }}
          leftComponent={{ icon: "home", color: "#fff" }}
          backgroundColor="#37A8D1"
        />
        <Grid style={{ paddingTop: 20, paddingBottom: 80 }}>
          <Row style={{ height: 150 }}>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={this._onPressButton}>
                <ImageBackground
                  source={require("./assets/payment.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Cash
                </Text>
              </TouchableOpacity>
            </Col>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={this._onPressButton}>
                <ImageBackground
                  source={require("./assets/wu.png")}
                  style={{ width: "100%", height: "100%" }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Western Union
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{ height: 130, paddingTop: 20 }}>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={this._onPressButton}>
                <ImageBackground
                  source={require("./assets/dollar.png")}
                  style={{ width: 130, height: 130 }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Money Exchange
                </Text>
              </TouchableOpacity>
            </Col>
            <Col />
          </Row>
        </Grid>
        <Hr lineColor="black" width={1} text="Dummy Text" />

        <Grid style={{ paddingTop: 20 }}>
          <Row style={{ height: 100, paddingHorizontal: 20 }}>
            <Col style={{ backgroundColor: "grey" }} style={{ width: 140 }}>
              <Button
                raised
                title="BUTTON"
                backgroundColor="#37A8D1"
                width="2"
              />
            </Col>
            <Col style={{ width: 240 }}>
              <Text style={{ textAlign: "right" }}>Some Text</Text>

              <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                Some bold Text
              </Text>
            </Col>
          </Row>
          <Row style={{ height: 100, paddingHorizontal: 20 }}>
            <Col style={{ backgroundColor: "grey" }} style={{ width: 140 }}>
              <Button raised title="BUTTON" backgroundColor="black" width="2" />
            </Col>
            <Col style={{ width: 240 }}>
              <Text style={{ textAlign: "right" }}>Some Text</Text>

              <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                Some bold Text
              </Text>
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
    backgroundColor: "#ecf0f1"
  }
});
