import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  I18nManager,
  TouchableOpacity,
  ImageBackground,
  Button,
  Text
} from "react-native";
import { Constants, Util } from "expo";
import "@expo/vector-icons";
import I18n from "ex-react-native-i18n";

import { createAppContainer, createStackNavigator } from "react-navigation";
import Maps from "./components/Maps";
import CashDelivered from "./components/CashDelivered";
import axios from "react-native-axios";
import Home from "./components/Home";
import WU from "./components/WU";
import Cash from "./components/Cash";
import Register from "./components/Register";
import Payment from "./components/Payment";
import Exchange from "./components/Exchange";
import ExchangeForm from "./components/ExchangeForm";
import Logout from "./components/Logout";
import Login from "./components/Login";
import { AsyncStorage } from "react-native";

export class Language extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    // I18nManager.forceRTL(true);
    this.state = {
      username: "",
      password: "",
      user_id: "",
      errorText: "",
      token: ""
    };
  }

  _bootstrapAsync = async () => {
    const userLanguage = await AsyncStorage.getItem("lang");
    //  console.log("the language in constructor is:" + userLanguage);
    if (userLanguage != "") {
      I18n.locale = userLanguage;
      this.props.navigation.navigate("Login");
    }
  };

  componentWillMount() {
    I18n.initAsync();
    _storeLang = async lang => {
      try {
        //    console.log("the language set is:" + lang);
        AsyncStorage.setItem("lang", lang);
      } catch (error) {
        alert("error in async storage");
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            _storeLang("ar");
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
            Util.reload();
          }}
        >
          <Text style={{ fontSize: 31 }}> العربية </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            _storeLang("en");
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
            Util.reload();
          }}
        >
          <Text style={{ fontSize: 31 }}> English </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20
  }
});
I18n.fallbacks = true;
//I18n.locale = "fr";
I18n.translations = {
  en: require("./en.json"),
  ar: require("./ar.json")
};

export const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Language: {
      screen: Language,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel: () => null,
        headerLeft: null,
        gesturesEnabled: false
      }
    },
    Logout: {
      screen: Logout
    },
    Register: {
      screen: Register,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Map: {
      screen: Maps,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    CashDelivered: {
      screen: CashDelivered,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Cash: {
      screen: Cash,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    WU: {
      screen: WU,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Exchange: {
      screen: Exchange,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    ExchangeForm: {
      screen: ExchangeForm,
      navigationOptions: {
        drawerLabel: () => null
      }
    }
  },
  {
    initialRouteName: "Language",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#37A8D1"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
    //contentComponent: drawerContentComponents
  },
  {}
);
const App = createAppContainer(RootStack);
export default App;
