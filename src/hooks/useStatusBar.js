//useStatusBar to provide simple way to change th status bar color when the current screen focus
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { StatusBarStyle } from "react-native";

const useStatusBar = (style, animated = true) => {
    useFocusEffect(React.useCallback(() => { StatusBar.setBarStyle(style, animated); }, []));
};

export default useStatusBar;