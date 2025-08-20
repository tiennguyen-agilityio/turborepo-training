import React from "react";

import Logo from "@repo/ui/components/Logo";
import Select from "@repo/ui/components/Select";
import DiscoverIcon from "@repo/ui/icons/DiscoverIcon";
import MasterCardIcon from "@repo/ui/icons/MasterCardIcon";
import MPesaIcon from "@repo/ui/icons/MPesaIcon";
import PaypalIcon from "@repo/ui/icons/PaypalIcon";
import VisaIcon from "@repo/ui/icons/VisaIcon";

const SettingLanguage = () => {
  return (
    <div className="container flex flex-col md:flex-row justify-center items-center mx-auto py-10 px-5 gap-5 lg:h-24">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <Logo className="text-chart-2 text-xl lg:text-2xl" />
        <div className="flex justify-center items-center gap-5 lg:gap-7.5 flex-wrap">
          <MPesaIcon />
          <DiscoverIcon />
          <VisaIcon />
          <PaypalIcon />
          <MasterCardIcon />
        </div>
      </div>
      <div className="flex gap-2.5">
        <Select
          placeholder="English (United States)"
          options={["English (United States)"]}
        />
        <Select placeholder="KES" options={["KES"]} />
      </div>
    </div>
  );
};

export default SettingLanguage;
