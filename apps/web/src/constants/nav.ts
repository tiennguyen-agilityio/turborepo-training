import { NavFooter } from "@/types/common";
import { ROUTES } from "./routes";

export const NAV_BAR = [
  { name: "Camping Locations", href: "/camping-locations" },
  { name: "Activities", href: "/activities" },
  { name: "Equipment", href: "/equipment" },
  { name: "Blogs", href: "/blogs" },
];

export const NAV_FOOTERS: NavFooter[] = [
  {
    label: "Company",
    links: [
      { text: "About Us", href: "/about-us" },
      { text: "Careers", href: "/careers" },
      { text: "Terms Of Use", href: "/terms-of-use" },
      { text: "Privacy Statement", href: "/privacy-statement" },
      { text: "Give Us Feedback", href: "/feedback" },
      { text: "Partner With Us", href: "/partner-with-us" },
    ],
  },
  {
    label: "Other Services & Support",
    links: [
      { text: "Rewards Program", href: "/rewards-program" },
      { text: "Partners", href: "/partners" },
      { text: "Legal", href: "/legal" },
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Customer Service Help", href: "/customer-service" },
    ],
  },
  {
    label: "Quick Links",
    links: [
      { text: "Your Account", href: "/account" },
      { text: "Camping Locations", href: "/camping-locations" },
      { text: "Activities", href: "/activities" },
      { text: "Hire Equipment", href: "/hire-equipment" },
      { text: "Blogs", href: "/blogs" },
    ],
  },
];

export const USER_DROPDOWNS = [
  {
    text: "Profile",
    href: ROUTES.USER_PROFILE,
  },
  {
    text: "Favorites",
    href: "/",
  },
  {
    text: "Notifications",
    href: "/",
  },
  {
    text: "My Reservations",
    href: "/",
  },
  {
    text: "Sign out",
    href: "/",
    isSignOut: true,
  },
];

export const USER_DROPDOWNS_LENGTH = USER_DROPDOWNS.length;
