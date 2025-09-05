export enum SCREENS {
  AUTH_STACK = "AuthStack",
  SIGN_IN = "SignIn",

  TABS = "Tabs",
  HOME = "Home",
  SEARCH = "Search",
  CART = "Cart",
  PROFILE = "Profile",
}

export type AuthStackParamList = {
  [SCREENS.SIGN_IN]: undefined;
};

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

export interface TabsStackParamList {
  [SCREENS.HOME]?: undefined;
  [SCREENS.SEARCH]?: undefined;
  [SCREENS.CART]?: undefined;
  [SCREENS.PROFILE]?: undefined;
}

export type AppStackParamList = {
  [SCREENS.AUTH_STACK]: undefined;
  [SCREENS.TABS]: undefined;
  [SCREENS.SEARCH]: undefined;
  [SCREENS.CART]: undefined;
  [SCREENS.PROFILE]: undefined;
};
