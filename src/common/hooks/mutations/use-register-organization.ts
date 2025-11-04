import { useMutation } from "@apollo/client";
import type {
  RegisterOrganizationMutation,
  RegisterOrganizationMutationVariables,
} from "@/graphql/generated/graphql";

import { RegisterOrganization } from "@/graphql/mutations/register-organization.graphql";

const useRegisterOrganization = () => {
  const [registerOrganization, { loading, error }] = useMutation<
    RegisterOrganizationMutation,
    RegisterOrganizationMutationVariables
  >(RegisterOrganization);

  return { registerOrganization, loading, error };
};

export default useRegisterOrganization;
