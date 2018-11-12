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
import { Header, Tile, Divider, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import "@expo/vector-icons";
import Hr from "react-native-hr-component";
import { Rootstack } from "./components/Navigator";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import Maps from "./components/Maps";
import SecondScreen from "./components/SecondScreen";

import FormScreen from "./components/FormScreen";
export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          rightComponent={{ icon: "home", color: "#fff" }}
          centerComponent={{
            text: "صرفلي",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => this.props.navigation.openDrawer()
          }}
          backgroundColor="#37A8D1"
        />
        <Grid style={{ paddingTop: 20, paddingBottom: 80 }}>
          <Row style={{ height: 150 }}>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Form")}
              >
                <ImageBackground
                  source={require("./assets/wu.png")}
                  style={{ width: "100%", height: "100%" }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Western Union
                </Text>
              </TouchableOpacity>
            </Col>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Form")}
              >
                <ImageBackground
                  source={require("./assets/payment.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Cash
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{ height: 130, paddingTop: 20 }}>
            <Col style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Form")}
              >
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
            <Col style={{ width: 240 }}>
              <Text style={{ width: 140 }}>Some Text</Text>

              <Text style={{ fontWeight: "bold", width: 140 }}>
                Some bold Text
              </Text>
            </Col>
            <Col>
              <Button
                rounded
                raised
                title="Test"
                backgroundColor="#37A8D1"
                width="2"
                onPress={() => {
                  this.props.navigation.navigate("Map");
                }}
              />
            </Col>
          </Row>
          <Row style={{ height: 100, paddingHorizontal: 20 }}>
            <Col style={{ width: 240 }}>
              <Text style={{ width: 140 }}>Some Text</Text>

              <Text style={{ fontWeight: "bold", width: 140 }}>
                Some bold Text
              </Text>
            </Col>
            <Col>
              <Button
                rounded
                raised
                title="Test"
                backgroundColor="black"
                width="2"
                onPress={() => {
                  this.props.navigation.navigate("Second");
                }}
              />
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

export const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Map: {
      screen: Maps,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Second: {
      screen: SecondScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Form: FormScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
