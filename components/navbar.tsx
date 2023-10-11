import { UserButton } from "@clerk/nextjs";

import React from "react";
import MobileSidebar from "./mobile-side-balr";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default Navbar;
