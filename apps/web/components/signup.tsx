"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { LucideGithub } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";

export const SignUpForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
  }

  return (
    <div className="w-[700px] h-screen mx-auto space-y-2 pt-20 pb-30 flex flex-col items-center">
      <div className="text-center text-3xl font-bold">Join now</div>
      <div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col my-8 space-y-4">
            <Button
              variant={"outline"}
              className="cursor-pointer min-w-[300px] max-w-[350px]"
            >
              <Image
                src={"/google-logo.svg"}
                alt=""
                width={14}
                height={14}
                className="translate-x-[3px]"
              />
              <span className="ml-1.5">Continue with Google</span>
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer min-w-[300px] max-w-[350px]"
            >
              <LucideGithub></LucideGithub>
              <span>Continue with Github</span>
            </Button>
          </div>
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-green-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#0a0a0a] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"default"}
              className="cursor-pointer h-8 min-w-[300px] max-w-[350px] mt-4.5"
              type="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-sm mt-4">
        Already have an account?
        <br />
        <Button
          variant={"link"}
          className="cursor-pointer pl-11"
          onClick={() => router.push("/sign-in")}
        >
          Login now
        </Button>
      </p>
    </div>
  );
};
