import React from "react";
import Link from "next/link";

import { NAV_FOOTERS } from "@/constants/nav";

import Button from "@/components/Button";
import Input from "@/components/Input";

const TopNav = () => {
  return (
    <div className="container mx-auto py-8 sm:py-12 lg:py-25 md:px-5">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:flex-wrap lg:flex-nowrap lg:gap-5">
        <div className="w-full md:flex-1/2 px-5 md:px-0 ld:w-auto">
          <h3 className="font-bold text-[13px] mb-3">Need Travelsy Help?</h3>
          <p className="mb-1 text-[13px]">Got Questions? Call us 24/7!</p>
          <p className="mb-1 text-[13px]">
            Call Us:{" "}
            <a href="tel:+254716909815" className="hover:underline">
              +254 716909 815
            </a>
          </p>
          <p className="text-xs">
            Email Us:{" "}
            <a href="mailto:info@travelsy.com" className="text-blue-600 hover:underline text-xs">
              info@travelsy.com
            </a>
          </p>
          <h4 className="font-bold text-[13px] mt-4">Contact Info:</h4>
          <p className="text-[13px]">
            2nd Floor, Fedha Plaza,
            <br />
            Westlands, Nairobi, Kenya.
          </p>
          <p className="text-xs">
            P.O Box 7231-00300
            <br />
            Nairobi, Kenya
          </p>
          <div className="flex space-x-3 mt-3 text-[10px]">
            <Button
              variant="outline"
              className="w-8 h-8 border-border rounded-full flex items-center justify-center hover:bg-sidebar-accent text-current"
            >
              Tw
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 border-border rounded-full flex items-center justify-center hover:bg-sidebar-accent text-current"
            >
              Ins
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 border-border rounded-full flex items-center justify-center hover:bg-sidebar-accent text-current"
            >
              You
            </Button>
          </div>
        </div>

        {NAV_FOOTERS?.map(({ label = "", links = [] }, index) => (
          <div key={index} className="w-full md:w-1/2 ld:w-auto px-5 md:px-0 mt-5 lg:mt-0">
            <h3 className="font-bold text-[13px] mb-3">{label}</h3>
            <div className="flex flex-col gap-2.5">
              {links?.map(({ text = "", href = "" }, currentIndex) => (
                <Link className="text-xs w-fit" key={currentIndex} href={href}>
                  {text}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="w-full md:w-1/2 lg:grow-1 lg:min-w-[355px] px-5 md:px-0 mt-5 lg:mt-0">
          <h3 className="font-bold text-[13px] mb-3">Mailing List</h3>
          <p className="text-xs mb-3">
            Sign up for our mailing list and get the latest offers and promotions straight in your
            inbox.
          </p>
          <div className="flex">
            <Input
              type="email"
              placeholder="Your Email"
              wrapperClassName="w-full"
              className="h-12.5 rounded-r-none rounded-br-none focus:outline-0 min-w-full"
            />
            <Button className="px-4 rounded-r-md rounded-tl-none rounded-bl-none">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
