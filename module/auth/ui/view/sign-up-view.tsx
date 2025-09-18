"use client"; 

import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

// 🔹 Form validation rules (Zod schema)
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required " }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password is not match",
  path: ["confirmPassword"],
});

export const SignUpView = () => {
  const router = useRouter(); // page navigation ke liye
  const [pending, setPending] = useState(false); // loading state
  const [error, setError] = useState<string | null>(null); // error message dikhane ke liye

  // 🔹 Jab form submit hota hai
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null); // purana error clear karo
    setPending(true); // button ko disable karo

    // Server ko signup request bhejna
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        // Agar signup success ho gaya
        onSuccess: () => {
          setPending(false);
          router.push("/"); // redirect to home
        },
        // Agar signup me error aaya
        onError: ({ error }) => {
          setPending(false);
          setError(error.message); // error UI me dikhana
        },
      }
    );
  };

  // 🔹 Form setup with React Hook Form + Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    // 🔹 Full page background + center form
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-4xl">

        {/* Card ke andar form aur design */}
        <Card className="overflow-hidden rounded-2xl shadow-xl border border-gray-200">
          <CardContent className="grid p-0 md:grid-cols-2">

            {/* 🔹 Left side: Form section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center p-7 text-gray-700"
              >
                <div className="flex flex-col gap-6">
                  
                  {/* Heading */}
                  <div className="flex flex-col items-center text-center">
                    <h1 className="md:text-3xl text-lg font-bold">
                      Let&apos;s get started
                    </h1>
                    <p className="text-muted-foreground text-balance">
                      Create your account
                    </p>
                  </div>

                  {/* Name input */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Aman Chauhan"
                              className="md:w-[300px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage /> {/* Error message */}
                        </FormItem>
                      )}
                    />
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
                          <FormMessage /> {/* Error message */}
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
                          <FormMessage /> {/* Error message */}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Confirm password input */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage /> {/* Error message */}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 🔹 Error alert (agar API fail kare) */}
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="w-4 h-4 !text-destrucitive " />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  {/* Submit button */}
                  <Button disabled={pending} type="submit" className="w-full">
                    Sign In
                  </Button>

                  {/* Divider with "Or continue with" */}
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
                    <Button variant="outline" type="button" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Github
                    </Button>
                  </div>

                  {/* Already account? → Sign in link */}
                  <div className="text-center text-sm">
                    Already have an account{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </Form>

            {/* 🔹 Right side design part (logo + brand) */}
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

        {/* 🔹 Terms and conditions niche */}
        <div className="text-muted-foreground mt-5 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
