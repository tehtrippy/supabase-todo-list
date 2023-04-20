import React, { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "../../helpers/supabase";
import { BoltIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Loading from "../Loading";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async () => {
    if (email && password) {
      try {
        setLoading(true);
        await signup({ email, password });
        setIsConfirm(true);
        toast.success("Signup Successfully!");
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  return loading ? (
    <div className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-sm mx-auto">
      <Loading />
    </div>
  ) : isConfirm ? (
    <div className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-sm mx-auto">
      <p className="font-bold text-white text-2xl">
        Confirm your email address!
      </p>
      <span className="text-white font-bold">Thanks you 🐸</span>
      <button
        className="bg-lime-500 text-white font-bold px-4 py-2"
        onClick={() => router.reload()}
      >
        SIGN IN
      </button>
    </div>
  ) : (
    <form
      className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-sm mx-auto"
      onSubmit={() => handleSignup()}
    >
      <div className="flex items-center space-x-2">
        <BoltIcon className="w-10 h-10 text-white" />
        <p className="font-bold text-white text-3xl">SIGN UP</p>
      </div>
      <input
        placeholder="Email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 w-full outline-lime-500 text-xl"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 w-full outline-lime-500 text-xl"
      />
      <div className="flex space-x-4">
        <button
          className="bg-lime-500 text-white font-bold px-4 py-2 text-xl"
          type="submit"
        >
          SIGN UP
        </button>
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 text-xl"
          type="button"
          onClick={() => router.reload()}
        >
          SING IN
        </button>
      </div>
    </form>
  );
};

export default SignUp;
