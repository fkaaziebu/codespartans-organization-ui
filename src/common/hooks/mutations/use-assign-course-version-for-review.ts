import { useMutation } from "@apollo/client";
import type {
  AssignCourseVersionForReviewMutation,
  AssignCourseVersionForReviewMutationVariables,
} from "@/graphql/generated/graphql";
import { AssignCourseVersionForReview } from "@/graphql/mutations/assign-course-version-for-review.graphql";

const useAssignCourseVersionForReview = () => {
  const [assignCourseVersionForReview, { loading, error }] = useMutation<
    AssignCourseVersionForReviewMutation,
    AssignCourseVersionForReviewMutationVariables
  >(AssignCourseVersionForReview);

  return { assignCourseVersionForReview, loading, error };
};

export default useAssignCourseVersionForReview;
