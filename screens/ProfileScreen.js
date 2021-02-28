import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
import { connect } from "react-redux";
import FeedbackModal from "../components/profilescreen_components/FeedbackModal";
import Toast from "react-native-fast-toast";
import Icon from "../components/Icon";
import AdComponent from "../components/AdComponent";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackModal: false,
    };
    this.toast = React.createRef();
  }

  toggleSwitch = () => {};

  handleFeedbackModal = (boolean, success = false) => {
    this.setState({ feedbackModal: boolean });

    if (success) {
      this.showToast();
    }
  };

  showToast = () => {
    this.toast.current.show("Thank  you for your feedback", {
      icon: (
        <Icon
          size={100}
          iconColor={colors.primary}
          name="emoticon-happy-outline"
        />
      ),
      duration: 2000,
      style: { padding: 0, backgroundColor: colors.fourth, borderRadius: 15 },
      textStyle: { fontSize: 20 },
    });
  };

  render() {
    return (
      <Screen style={styles.container}>
        <Image
          source={require("../assets/magnifying-glass.png")}
          style={styles.logo}
        />
        <ScrollView style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", marginTop: "5%", width: "90%" }}>
            <Text style={styles.text}>NUM OF ITEMS YOU HAVE: </Text>
            <Text style={styles.totalItems}>{this.props.totalItems}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: "5%", width: "90%" }}>
            <Text style={styles.text}>NUM OF ITEMS YOU CAN HAVE IS: </Text>
            <Text style={styles.totalItems}>{this.props.maxItems}</Text>
          </View>

          <AppButton
            title="Send feeback"
            textStyle={{ fontWeight: "bold", color: colors.primary }}
            style={{
              marginTop: "5%",
              width: 100,
              height: 75,
              alignSelf: "center",
              backgroundColor: colors.fifth,
              borderRadius: 20,
            }}
            onPress={() => this.handleFeedbackModal(true)}
          />

          <FeedbackModal
            closeModal={(success) => this.handleFeedbackModal(false, success)}
            visible={this.state.feedbackModal}
          />

          <Toast
            textStyle={{ fontWeight: "bold" }}
            offset={100}
            placement="top"
            ref={this.toast}
          />
          <AppButton
            iconName="logout"
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: "20%",
            }}
            onPress={() => firebase.auth().signOut()}
          />
          <Text style={styles.logoutText}>LOGOUT</Text>
          <AdComponent />
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    uid: state.uid,
    loading: state.loading,
    noData: state.noData,
    totalItems: state.totalItems,
    maxItems: state.maxItems,
  };
};
export default connect(mapStateToProps, null)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.eights,
  },
  logo: {
    height: 40,
    width: 40,
    alignSelf: "center",
    marginVertical: "1%",
  },

  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
  },
  imageContainer: {
    height: 200,
    width: "50%",
    // backgroundColor: "red",
    marginLeft: "1%",
  },
  totalItems: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: "5%",
  },
  lowerSectionContainer: {
    // backgroundColor: "blue",
    height: "100%",
    margin: "1%",
  },

  logoutText: {
    marginTop: "4%",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
