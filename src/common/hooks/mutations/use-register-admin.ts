import { useMutation } from "@apollo/client";
import type {
  RegisterAdminMutation,
  RegisterAdminMutationVariables,
} from "@/graphql/generated/graphql";
import { RegisterAdmin } from "@/graphql/mutations/register-admin.graphql";

const useRegisterAdmin = () => {
  const [registerAdmin, { loading, error }] = useMutation<
    RegisterAdminMutation,
    RegisterAdminMutationVariables
  >(RegisterAdmin);

  return { registerAdmin, loading, error };
};

export default useRegisterAdmin;
