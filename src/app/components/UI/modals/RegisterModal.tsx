"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "@/app/components/Heading";
import Input from "../inputs/Input";
import Button from "../Button";

function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);
      await signIn("credentials", {
        ...data,
        redirect: false,
      });
      router.refresh();
      registerModal.onClose();
      toast.success("Signed up successfully.");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
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
  //     toast.success("Signed up successfully.");
  //   } catch (error) {
  //     toast.error("Something went wrong, please try again.");
  //   }
  // };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Groundbnb" subtitle="Create an account" />
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
        id="name"
        label="Name"
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
        onClick={() => handleSocialLogin("google")}
      /> */}
      {/* <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => handleSocialLogin("github")}
      /> */}

      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex justify-center gap-2 text-center">
          <p>Already have an account?</p>
          <p
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="cursor-pointer text-neutral-800 hover:underline">
            Log in
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
