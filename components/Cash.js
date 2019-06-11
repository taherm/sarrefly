import React, { Component } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import { URL } from "./constant";
import I18n from "ex-react-native-i18n";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_KEY } from "./constant";
import axios from "react-native-axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  WebView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from "react-native";
import { Header, Button, FormLabel, FormInput } from "react-native-elements";

import RadioGroup from "react-native-radio-buttons-group";

import { bold, black } from "ansi-colors";

class Cash extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      country: "",
      value: 0,
      chargesProps: [
        {
          label: I18n.t("Form2Kd"),
          value: 2
        },
        { label: I18n.t("Form5Kd"), value: 5 }
      ],
      saveProps: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }],
      charges: 2,
      saveSelected: 0,
      receiver_address: "",
      receiver_mobile: "",
      receiver_name: "",
      amount: "",
      civil_id: "",
      order_type: navigation.getParam("order_type", "no_order_type"),
      user_id: navigation.getParam("user_id", ""),
      errorText: "",
      savedData: [],
      radio_status: "",
      token: navigation.getParam("token", ""),
      isLoaded: 0,
      location_data: "",
      origin: { latitude: 29.3770704, longitude: 47.9847947 },
      location: { latitude: "", longitude: "" },
      modalVisible: false
    };

    axios
      .get(
        URL +
          "/saved_orders/" +
          this.state.user_id +
          "?api_token=" +
          this.state.token
      )
      .then(response => {
        if (response.data) {
          this.setState({
            savedData: response.data
          });
          // alert(this.state.initialArr.id[0]);
        }
      });
  }

  onPress = data => this.setState({ data });

  static navigationOptions = () => ({
    title: I18n.t("ModeCash")
  });
  onValueChange(value) {
    this.setState({
      country: value
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setSavedvalues(item) {
    this.setState({ receiver_name: item.receiver_name });
    this.setState({ receiver_mobile: item.receiver_mobile });
    this.setState({ receiver_address: item.receiver_address });
    this.setState({ civil_id: item.civil_id });
    this.setState({ country: item.country });
    this.setState({ amount: item.amount });
  }

  handleSearch(data, details) {
    this.setState(prevState => ({
      origin: {
        ...prevState.origin,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      }
    }));
  }

  handleClick() {
    if (this.state.receiver_name == "") {
      this.setState({ errorText: "Please Enter Receiver Name!" });
    } else if (this.state.receiver_mobile == "") {
      this.setState({ errorText: "Please Enter Receiver Mobile" });
    } else if (this.state.receiver_mobile.length > 8) {
      this.setState({ errorText: "Enter only 8 Digits for Mobile" });
    } else if (this.state.civil_id == "") {
      this.setState({ errorText: "Please Enter Civil ID!" });
    } else if (this.state.civil_id.length > 12) {
      this.setState({ errorText: "Enter only 12 Digits for Civil ID" });
    } else if (this.state.receiver_address == "") {
      this.setState({ errorText: "Please Enter Receiver Address!" });
    } else if (this.state.amount == "") {
      this.setState({ errorText: "Please Enter Amount!" });
    } else {
      try {
        axios
          .post(URL + "/orders" + "?api_token=" + this.state.token, {
            user_id: this.state.user_id,
            receiver_name: this.state.receiver_name,
            receiver_mobile: this.state.receiver_mobile,
            receiver_address: this.state.receiver_address,
            amount: this.state.amount,
            civil_id: this.state.civil_id,
            order_type: this.state.order_type,
            status: "pending",
            saved: this.state.saveSelected,
            charges: this.state.charges,
            location_data: this.state.location_data,
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
          })
          .then(response => {
            this.setState({ isLoaded: 1 });
            if (response.status == "201") {
              axios
                .post(
                  URL + "/make_payment" + "?api_token=" + this.state.token,
                  {
                    order_id: response.data,
                    amount: this.state.amount,
                    charges: this.state.charges
                  }
                )
                .then(response => {
                  return this.props.navigation.navigate("Payment", {
                    url: response.data.transaction.url,
                    user_id: this.state.user_id
                  });
                });
            } else {
              alert("Error Occurred!");
            }
          });
      } catch (exception) {
        alert(exception);
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoaded ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center" }}
            size="large"
            color="#37A8D1"
          />
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <FormLabel labelStyle={{ textAlign: "left", fontWeight: "bold" }}>
              {I18n.t("SavedBeneficiaryData")}
            </FormLabel>

            <FlatList
              horizontal
              data={this.state.savedData}
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "white" }}
              renderItem={({ item }) => (
                <Button
                  title={item.receiver_name}
                  onPress={() => this.setSavedvalues(item)}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
            <FormLabel labelStyle={{ textAlign: "left", fontWeight: "bold" }}>
              {I18n.t("NewBeneficiary")}
            </FormLabel>
            <Form>
              <Item floatingLabel>
                <Label style={{ textAlign: "left" }}>
                  {I18n.t("FormName")}
                </Label>

                <Input
                  onChangeText={receiver_name =>
                    this.setState({ receiver_name })
                  }
                  value={this.state.receiver_name}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ textAlign: "left" }}>
                  {I18n.t("FormMobile")}
                </Label>
                <Input
                  onChangeText={receiver_mobile =>
                    this.setState({ receiver_mobile })
                  }
                  value={String(this.state.receiver_mobile)}
                  keyboardType="number-pad"
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ textAlign: "left" }}>
                  {I18n.t("FormCivilID")}
                </Label>
                <Input
                  onChangeText={civil_id => this.setState({ civil_id })}
                  value={String(this.state.civil_id)}
                  keyboardType="number-pad"
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ textAlign: "left" }}>
                  {I18n.t("FormAddress")}
                </Label>
                <Input
                  onChangeText={receiver_address =>
                    this.setState({ receiver_address })
                  }
                  value={this.state.receiver_address}
                />
              </Item>
              <Modal
                animationType="slide"
                transparent={false}
                presentationStyle="fullScreen"
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={{ marginTop: 52 }}>
                  <View style={styles.container}>
                    <MapView
                      region={{
                        latitude: this.state.origin.latitude,
                        longitude: this.state.origin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      }}
                      style={{ ...StyleSheet.absoluteFillObject }}
                    >
                      <MapView.Marker
                        draggable
                        coordinate={this.state.origin}
                        onDragEnd={e =>
                          this.setState({ location: e.nativeEvent.coordinate })
                        }
                      />

                      <GooglePlacesAutocomplete
                        placeholder="Search the place where you want to go.."
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed="false" // true/false/undefined
                        fetchDetails
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) =>
                          // 'details' is provided when fetchDetails = true
                          this.handleSearch(data, details)
                        }
                        getDefaultValue={() => ""}
                        query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: GOOGLE_KEY,
                          language: "en" // language of the results
                        }}
                        styles={{
                          textInputContainer: {
                            width: "100%"
                          },
                          description: {
                            fontWeight: "bold"
                          },
                          predefinedPlacesDescription: {
                            color: "#1faadb"
                          }
                        }}
                        GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          types: "country"
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                      />
                    </MapView>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <Text>Close Map</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <FormLabel
                  labelStyle={{ textAlign: "left", fontWeight: "bold" }}
                >
                  Set Delivery Location
                </FormLabel>
              </TouchableHighlight>
              <Item floatingLabel>
                <Label style={{ textAlign: "left" }}>
                  {I18n.t("FormAmount")}
                </Label>
                <Input
                  onChangeText={amount => this.setState({ amount })}
                  value={this.state.amount}
                  keyboardType="number-pad"
                />
              </Item>
            </Form>
            <FormLabel labelStyle={{ textAlign: "left", fontWeight: "bold" }}>
              Saved User Details
            </FormLabel>

            <RadioForm
              radio_props={this.state.saveProps}
              initial={0}
              formHorizontal={true}
              onPress={saveSelected => {
                this.setState({ saveSelected: saveSelected }, () =>
                  console.log(
                    this.state.saveSelected,
                    "this.state.saveSelected"
                  )
                );
              }}
            />

            <RadioForm
              radio_props={this.state.chargesProps}
              initial={0}
              onPress={charges => {
                this.setState({ charges: charges }, () =>
                  console.log(this.state.charges)
                );
              }}
            />
            <Button
              title={I18n.t("FormPay")}
              buttonStyle={{
                backgroundColor: "#37A8D1",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              onPress={() => this.handleClick()}
            />

            <Text style={{ textAlign: "center", color: "red", paddingTop: 10 }}>
              {this.state.errorText}
            </Text>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {},
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 650
  }
});

export default Cash;
