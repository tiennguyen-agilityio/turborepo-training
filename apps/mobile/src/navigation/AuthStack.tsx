import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Interfaces
import { AuthStackParamList, SCREENS } from "../types";

// Screens
import { SignInScreen } from "../screens";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
  </Stack.Navigator>
);

export default AuthStack;
