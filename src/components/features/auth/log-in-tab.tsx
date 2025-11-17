import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useLoginOrganization } from "@/common/hooks/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LogInTabProps = {
  handleTabChange: (tab: "sign_up" | "log_in") => void;
  onSuccess?: () => void;
};

export type LogInFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const logInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export const LogInTab = ({ handleTabChange, onSuccess }: LogInTabProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { loginOrganization } = useLoginOrganization();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LogInFormInputs>({
    // @ts-expect-error error
    resolver: zodResolver(logInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LogInFormInputs> = async (data) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      const response = await loginOrganization({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.error) {
        const errorMessage =
          response.error.message || "Login failed. Please try again.";
        setServerError(errorMessage);
        return;
      }

      if (!response.data?.loginOrganization?.token) {
        setServerError("No authentication token received. Please try again.");
        return;
      }

      // Store token in sessionStorage
      sessionStorage.setItem("token", response.data.loginOrganization.token);

      // Store email if remember me is checked
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setSuccessMessage("Login successful! Redirecting...");
      reset();

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Redirect to users page after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during login. Please try again.";
      setServerError(errorMessage);
      console.error("Login error:", error);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      // You would need to use setValue to set this value
      // For now, this is just for demonstration
    }
  }, []);

  return (
    <>
      <form
        onSubmit={
          // @ts-expect-error error
          handleSubmit(onSubmit)
        }
        className="z-30 flex w-full flex-col gap-6"
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
              placeholder="Enter your password"
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
        </div>

        <div className="flex items-center">
          <div className="mr-auto flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="h-4 w-4 cursor-pointer"
              disabled={isSubmitting}
            />
            <label
              htmlFor="rememberMe"
              className="cursor-pointer text-sm font-medium text-gray-700"
            >
              Remember for 30 days
            </label>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-[#6941C6] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password
          </Link>
        </div>

        <div>
          <Button
            type="submit"
            className="h-11 w-full bg-[#7F56D9] py-2.5 text-white hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm text-gray-600">Don't have an account?</span>
        <Link
          href="#"
          className="text-sm font-semibold text-[#6941C6]"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange("sign_up");
          }}
        >
          Sign up
        </Link>
      </div>
    </>
  );
};
