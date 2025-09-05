import { StatusBar } from "react-native";

// Interfaces
import { SCREENS } from "../types";

// Stacks | Screens
import {
  // CartScreen,
  // ProfileScreen,
  // SearchScreen,
  SignInScreen,
  // HomeScreen
} from "../screens";
// import TabsStack from './TabsStack';
// import AuthStack from './AuthStack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// export const Navigation = createStaticNavigation(RootStack);

// const AppStack = createNativeStackNavigator()

export const Navigation = () => {
  console.log(" ---Screen", SCREENS.HOME);

  return (
    <GestureHandlerRootView>
      <StatusBar />
      <SignInScreen />
      {/* <NavigationContainer>
					<AppStack.Navigator>
						<AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
						<AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
						<AppStack.Screen name={SCREENS.HOME} component={HomeScreen} />
					</AppStack.Navigator>
				</NavigationContainer> */}
    </GestureHandlerRootView>
  );
};
