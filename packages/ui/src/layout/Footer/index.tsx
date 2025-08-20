import CopyRight from "./CopyRight";
import SettingLanguage from "./SettingLanguage";
import TopNav from "./TopNav";
import Testimonials from "./Testimonials";

const Footer = () => {
  return (
    <footer className="w-full">
      <Testimonials />
      <TopNav />
      <div className="border-t border-border" />
      <SettingLanguage />
      <div className="border-t border-border" />
      <CopyRight />
    </footer>
  );
};

export default Footer;
