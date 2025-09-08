import React, { ReactNode, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme, Text } from "tamagui";

// Types
import { SCREENS, TabBarIcon } from "../types";

// Screens
import {
  CartScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
} from "../screens";

// Components
import { HomeIcon } from "@packages/ui/icons/HomeIcon";
import { SearchIcon } from "@packages/ui/icons/SearchIcon";
import { CartIcon } from "@packages/ui/icons/CartIcon";
import { UserIcon } from "@packages/ui/icons/UserIcon";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const themes = useTheme();

  const renderTabBarIcon = useCallback(
    (screen: SCREENS) => {
      const mappingIcon = ({ focused }: TabBarIcon): ReactNode => {
        let Icon = null;
        switch (screen) {
          case SCREENS.HOME:
            Icon = HomeIcon;
            break;

          case SCREENS.SEARCH:
            Icon = SearchIcon;
            break;

          case SCREENS.CART:
            Icon = CartIcon;
            break;

          case SCREENS.PROFILE:
            Icon = UserIcon;
            break;
          default:
            return null;
        }
        return (
          <Text paddingTop="$2">
            <Icon
              {...(focused && {
                color: themes["$primary"]?.val,
              })}
            />
          </Text>
        );
      };

      return mappingIcon;
    },
    [themes]
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: renderTabBarIcon(route.name as SCREENS),
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.CART} component={CartScreen} />
      <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
