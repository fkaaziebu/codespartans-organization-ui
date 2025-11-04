// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListInstructorsQuery,
  ListInstructorsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListInstructors } from "@/graphql/queries/list-instructors.graphql";

// hook
function useListInstructors(args?: ListInstructorsQueryVariables) {
  const [listInstructors, { data, loading, error }] = useLazyQuery<
    ListInstructorsQuery,
    ListInstructorsQueryVariables
  >(ListInstructors, {
    variables: args,
  });

  return {
    listInstructors,
    data: data?.listInstructors,
    loading,
    error,
  };
}

export default useListInstructors;
