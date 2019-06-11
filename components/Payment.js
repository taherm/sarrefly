const WEBVIEW_REF = "WEBVIEW_REF";
import React, { Component } from "react";
import {
  View,
  WebView,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Constants } from "expo";
class Payment extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      url: navigation.getParam("url", "no_code"),
      user_id: navigation.getParam("user_id", "no_id"),
      canGoBack: ""
    };
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
          >
            <Text
              style={
                this.state.canGoBack
                  ? styles.topbarText
                  : styles.topbarTextDisabled
              }
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: this.state.url }}
          ref={WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  onBack() {
    this.props.navigation.navigate("Home", {
      user_id: this.state.user_id
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#37A8D1"
  },
  topbar: {
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  topbarTextDisabled: {
    color: "gray"
  }
});

export default Payment;
