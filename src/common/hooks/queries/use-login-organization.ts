// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  LoginOrganizationQuery,
  LoginOrganizationQueryVariables,
} from "@/graphql/generated/graphql";
import { LoginOrganization } from "@/graphql/queries/login-organization.graphql";

// hook
function useLoginOrganization(args?: LoginOrganizationQueryVariables) {
  const [loginOrganization, { data, loading, error }] = useLazyQuery<
    LoginOrganizationQuery,
    LoginOrganizationQueryVariables
  >(LoginOrganization, {
    variables: args,
  });

  return {
    loginOrganization,
    data: data?.loginOrganization,
    loading,
    error,
  };
}

export default useLoginOrganization;
