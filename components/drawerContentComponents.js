import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { white } from "ansi-colors";
import I18n from "ex-react-native-i18n";
export default class drawerContentComponents extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
  }

  componentWillMount() {
    I18n.initAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          <View style={styles.screenStyle}>
            <Text
              onPress={() => {
                I18n.locale = "fr";
                this.forceUpdate();
              }}
            >
              Language Change
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    paddingTop: 20
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20
  }
});
