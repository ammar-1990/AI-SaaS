import { UserButton } from "@clerk/nextjs";

import React from "react";
import MobileSidebar from "./mobile-side-balr";
import { getApiCount } from "@/lib/increase-api-count";
import { checkSubscription } from "@/lib/subscription";

type Props = {};

const Navbar =async (props: Props) => {

const count = await getApiCount()
const isPro = await checkSubscription()
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} count={count} />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default Navbar;
