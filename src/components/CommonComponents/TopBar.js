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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import renderIf from "../../utils/renderIf";
const deviceWidth = Dimensions.get("window").width;
import { semiBold, deleteNotificationApi, baseURL } from "../../Constant";
import DeviceInfo from "react-native-device-info";
import { COLORS } from "../../utils/colors";

const Topbar = (props) => {

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
              fontFamily:"Helvetica",
              width: "95%",
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
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
