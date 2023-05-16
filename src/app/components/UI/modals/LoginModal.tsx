"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "@/app/components/Heading";
import Input from "../inputs/Input";
import Button from "../Button";

function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Logged in successfully.");
        router.refresh();
        loginModal.onClose();
      }

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsLoading(false);
  };

  // const handleSocialLogin = async (provider: "github" | "google") => {
  //   setIsLoading(true);

  //   try {
  //     await signIn(provider, {
  //       redirect: false,
  //     });
  //     router.refresh();
  //     registerModal.onClose();
  //     toast.success("Logged in successfully.");
  //   } catch (error) {
  //     toast.error("Something went wrong, please try again.");
  //   }
  // };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Groundbnb" subtitle="Log into your account" />
      <Input
        register={register}
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      /> */}
      {/* <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => handleSocialLogin("github")}
      /> */}

      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex justify-center gap-2 text-center">
          <p>Don&apos;t have an account?</p>
          <p
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className="cursor-pointer text-neutral-800 hover:underline">
            Sign up
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
