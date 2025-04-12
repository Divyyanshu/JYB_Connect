import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import renderIf from "../../utils/renderIf";
const deviceWidth = Dimensions.get("window").width;
import { semiBold, deleteNotificationApi, baseURL } from "../../Constant";
import DeviceInfo from "react-native-device-info";
import { COLORS } from "../../utils/colors";
import { dropAllTables } from "../../database/db";
import { removeToken } from "../../utils/shared";

const Topbar = (props) => {

  function LogoutButtonClicked() {
    console.log("Logout Button Clicked")
    Alert.alert("Are you sure you want to logout?", "", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => clearUserData()},
    ]);

  }
  async function clearUserData() {
    dropAllTables();
    try {
      await removeToken();

      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
        text2: 'You have been logged out successfully!',
      });

      // Slight delay for better UX before navigating
      setTimeout(() => {
        props.navState.reset({
          index: 0,
          routes: [
            {
              name: STACKS.MAIN_STACK,
              state: {
                routes: [{name: SCREENS.MAIN_STACK.LOGIN}],
              },
            },
          ],
        });
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Something went wrong. Please try again!',
      });
      console.error('Logout Error:', error);
    }


  }

  return (
    <View
      style={[
        styles.topBarStyle,
        {
          backgroundColor: COLORS.PRIMARY,
        },
      ]}
    >
      {renderIf(
        props.showBack == true,
        <View
          style={{
            position: "absolute",
            left: 10,
            justifyContent: "center",
            alignItems: "center",
            bottom: 4,
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={() => {
              props.navState.pop();
            }}
          >
            <Image
              style={{
                height: 30,
                width: 30,
                alignSelf: "center",
              }}
              resizeMode="contain"
              source={require("../../assets/icons/back.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      {renderIf(
        props.showtitle == true,
        <TouchableOpacity
          onPress={() => {
            props.navState.pop();
          }}
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            bottom: 10,
            width: "70%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "#fff",
              fontSize: 22,
              fontFamily: "Helvetica",
              width: "95%",
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
      )}

      {renderIf(
        props.showLogout == true,
        <View
          style={{
            position: "absolute",
            right: 10,
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
            height: 44,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              LogoutButtonClicked()
            }}
          >
            <Image
              source={require("../../assets/icons/logout.png")}
              style={{ margin: 10, width: 34, height: 34 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}



    </View>
  );
};

const styles = StyleSheet.create({
  topBarStyle: {
    height: DeviceInfo.hasNotch() == true ? 110 : 80,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },

  topBarTextStyle: {
    fontSize: 28,
    color: "#272727",
    width: deviceWidth - 126,
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    left: 63,
  },
});

export default Topbar;
