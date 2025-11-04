// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListRequestedReviewsQuery,
  ListRequestedReviewsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListRequestedReviews } from "@/graphql/queries/list-requested-reviews.graphql";

// hook
function useListRequestedReviews(args?: ListRequestedReviewsQueryVariables) {
  const [listRequestedReviews, { data, loading, error }] = useLazyQuery<
    ListRequestedReviewsQuery,
    ListRequestedReviewsQueryVariables
  >(ListRequestedReviews, {
    variables: args,
  });

  return {
    listRequestedReviews,
    data: data?.listRequestedReviews,
    loading,
    error,
  };
}

export default useListRequestedReviews;
