import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterOrganization } from "@/common/hooks/mutations";
import { CheckIcon } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SignUpTabProps = {
  handleTabChange: (tab: "sign_up" | "log_in") => void;
  onSuccess?: () => void;
};

export type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpTab = ({ handleTabChange, onSuccess }: SignUpTabProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { registerOrganization } = useRegisterOrganization();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // Validate password requirements
  const passwordMinLength = password && password.length >= 8;
  const passwordHasSpecialChar =
    password && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      const response = await registerOrganization({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors?.length) {
        const errorMessage = response.errors[0].message;
        setServerError(errorMessage);
        return;
      }

      setSuccessMessage("Registration successful! Redirecting to login...");
      reset();

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Optional: Switch to login tab after a short delay
      setTimeout(() => {
        handleTabChange("log_in");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during registration. Please try again.";
      setServerError(errorMessage);
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        {serverError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {serverError}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className={cn(
                "h-11 border border-gray-300 bg-white px-3.5 py-2.5 text-gray-500 shadow-xs",
                errors.name ? "border-red-500" : "",
              )}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={cn(
                "h-11 border border-gray-300 bg-white px-3.5 py-2.5 text-gray-500 shadow-xs",
                errors.email ? "border-red-500" : "",
              )}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className={cn(
                "h-11 border border-gray-300 bg-white px-3.5 py-2.5 text-gray-500 shadow-xs",
                errors.password ? "border-red-500" : "",
              )}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={cn(
                "h-11 border border-gray-300 bg-white px-3.5 py-2.5 text-gray-500 shadow-xs",
                errors.confirmPassword ? "border-red-500" : "",
              )}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CheckIcon color={passwordMinLength ? "#9810fa" : undefined} />
              <span className="text-sm text-gray-600">
                Must be at least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon
                color={passwordHasSpecialChar ? "#9810fa" : undefined}
              />
              <span className="text-sm text-gray-600">
                Must contain one special character
              </span>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="h-11 w-full bg-[#7F56D9] py-2.5 text-white hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Get Started"}
          </Button>
        </div>
      </form>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm text-gray-600">Already have an account?</span>
        <Link
          href="#"
          className="text-sm font-semibold text-[#6941C6]"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange("log_in");
          }}
        >
          Log In
        </Link>
      </div>
    </>
  );
};
