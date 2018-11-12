import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";

import { Constants } from "expo";
class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid style={{ paddingTop: 170 }}>
          <Row>
            <Col>
              <Image source={require("../assets/second.png")} />
              <Text style={{ fontSize: 70, color: "#fff", textAlign: "left" }}>
                4155
              </Text>
              <Text style={{ fontSize: 30, color: "#fff", textAlign: "left" }}>
                رقم الكود
              </Text>
            </Col>
          </Row>
          <Row>
            <Col />
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

export default SecondScreen;
