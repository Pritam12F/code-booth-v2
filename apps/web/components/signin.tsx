"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Eye, EyeClosed, LucideGithub } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@workspace/common";
import { z } from "zod";

export const SignIn = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
  }

  return (
    <div className="w-[700px] h-screen mx-auto space-y-2 py-32 flex flex-col items-center">
      <div className="text-center text-3xl font-bold">Log in</div>
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
        <div className="space-y-5">
          <Input placeholder="Enter email" />
          <span className="relative">
            <Input type="password" placeholder="Enter password" />
            <span className="absolute inset-0">
              {isVisible ? <EyeClosed /> : <Eye />}
            </span>
          </span>
        </div>
      </div>
      <Button
        variant={"default"}
        className="cursor-pointer min-w-[300px] max-w-[350px] mt-4.5"
      >
        Continue
      </Button>
      <p className="text-sm mt-4">
        Don't have an account?
        <br />
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/sign-up")}
        >
          Create an account
        </Button>
      </p>
    </div>
  );
};
