// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetStatsQuery,
  GetStatsQueryVariables,
} from "@/graphql/generated/graphql";
import { GetStats } from "@/graphql/queries/get-stats.graphql";

// hook
function useGetStats(args?: GetStatsQueryVariables) {
  const [getStats, { data, loading, error }] = useLazyQuery<
    GetStatsQuery,
    GetStatsQueryVariables
  >(GetStats, {
    variables: args,
  });

  return {
    getStats,
    data: data?.getStats,
    loading,
    error,
  };
}

export default useGetStats;
