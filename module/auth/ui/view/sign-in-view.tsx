"use client"; 

// Components, libraries aur hooks import ho rahe hain
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {FaGithub , FaGoogle} from "react-icons/fa"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Zod validation schema banaya gaya (email required, password required)
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter()
  const [pending, setPending] = useState(false); // Button disable / loading state ke liye
  const [error, setError] = useState<string | null>(null); // Error message store karne ke liye

  // Form submit hone ke baad chalne wala function
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    // AuthClient ke through sign-in karne ki call
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL:"/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/")
        },

        onError: ({ error }) => {
          setPending(false);
          setError(error.message); // Error hone par UI me show hoga
        },
      }
    );
  };
    const onSocial = (provider: "github" | "google" ) => {
      setError(null); // purana error clear karo
      setPending(true); // button ko disable karo
  
      // Server ko signup request bhejna
      authClient.signIn.social(
        {
         provider:provider,
         callbackURL:"/",
        },
        {
          // Agar signup success ho gaya
          onSuccess: () => {
            setPending(false);
           // redirect to home
          },
          // Agar signup me error aaya
          onError: ({ error }) => {
            setPending(false);
            setError(error.message); // error UI me dikhana
          },
        }
      );
    };

  // React Hook Form setup with Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    // Page layout - full screen center alignment with gradient background
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-4xl">
        {/* Card wrapper */}
        <Card className="overflow-hidden rounded-2xl shadow-xl border border-gray-200">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Form section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)} // Form submission
                className="flex flex-col items-center justify-center p-7 text-gray-700"
              >
                <div className="flex flex-col gap-6">
                  {/* Heading */}
                  <div className="flex flex-col items-center text-center">
                    <h1 className="md:text-3xl text-lg font-bold">
                      Welcome back
                    </h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your account
                    </p>
                  </div>

                  {/* Email input */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="a@gmail.com"
                              className="md:w-[300px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage /> {/* Agar validation error hoga to ye show karega */}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password input */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage /> {/* Validation error message */}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Error message alert */}
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="w-4 h-4 !text-destrucitive " />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  {/* Sign-in button */}
                  <Button disabled={pending} type="submit" className="w-full">
                    Sign In
                  </Button>

                  {/* Divider line with text */}
                  <div
                    className="relative text-center text-sm 
              after:absolute after:inset-0 after:top-1/2 
              after:flex after:items-center after:border-t 
              after:border-border after:z-0"
                  >
                    <span className="relative z-10 bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>

                  {/* Social login buttons */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button
                     onClick={()=>onSocial("google")}
                    variant="outline" 
                    type="button" 
                    className="w-full">
                      <FaGoogle/>
                    </Button>
                    <Button 
                    variant="outline" 
                    onClick={()=> onSocial("github")}
                    type="button" 
                    className="w-full">
                  <FaGithub/>
                    </Button>
                  </div>

                  {/* Sign-up link */}
                  <div className="text-center text-sm">
                    Don&apos;t have an account{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>

            {/* Right side (branding/logo area) */}
            <div className="bg-gradient-to-br from-orange-400 via-white to-green-400 relative hidden md:flex flex-col items-center justify-center gap-y-5 p-5">
              <img
                src="/logo.svg"
                alt="Logo"
                className="mt-2 w-[102px] drop-shadow-lg"
              />
              <p className="text-4xl font-bold text-black">AI Agent</p>
            </div>
          </CardContent>
        </Card>

        {/* Terms and conditions text */}
        <div className="text-muted-foreground mt-5 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking contine, you agree to our <a href="#"> Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
