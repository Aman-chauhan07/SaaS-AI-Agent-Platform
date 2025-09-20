import { SignUpView } from "../../../../module/auth/ui/view/sign-up-view";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
  
    if(!!session){
      redirect("/")
    }
  return <SignUpView />;
};

export default page;
