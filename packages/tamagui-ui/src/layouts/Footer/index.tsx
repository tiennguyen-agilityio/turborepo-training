"use client";

import { YStack } from "tamagui";

import CopyRight from "./CopyRight";
import TopNav from "./TopNav";
import Testimonials from "./Testimonials";
import SettingLanguage from "./SettingLanguage";

const Footer = () => {
  return (
    <YStack>
      <Testimonials />
      <TopNav />
      <SettingLanguage />
      <CopyRight />
    </YStack>
  );
};

export default Footer;
