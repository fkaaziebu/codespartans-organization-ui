"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterAdmin } from "@/common/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const adminSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function CreateAdminModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { registerAdmin } = useRegisterAdmin();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await registerAdmin({
        variables: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        // handle error
        console.log(error);
        return;
      }
    } finally {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Create New Admin
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-gray-800"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              className={cn(
                "py-5 text-gray-600",
                errors.firstName ? "border-red-500" : "",
              )}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-gray-800"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              className={cn(
                "py-5 text-gray-600",
                errors.lastName ? "border-red-500" : "",
              )}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-800">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={cn(
                "py-5 text-gray-600",
                errors.email ? "border-red-500" : "",
              )}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-800"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn(
                "py-5 text-gray-600",
                errors.password ? "border-red-500" : "",
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
