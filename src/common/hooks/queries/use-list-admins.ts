// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListAdminsQuery,
  ListAdminsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListAdmins } from "@/graphql/queries/list-admins.graphql";

// hook
function useListAdmins(args?: ListAdminsQueryVariables) {
  const [listAdmins, { data, loading, error }] = useLazyQuery<
    ListAdminsQuery,
    ListAdminsQueryVariables
  >(ListAdmins, {
    variables: args,
  });

  return {
    listAdmins,
    data: data?.listAdmins,
    loading,
    error,
  };
}

export default useListAdmins;
