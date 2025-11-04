import { useMutation } from "@apollo/client";
import type {
  RegisterInstructorMutation,
  RegisterInstructorMutationVariables,
} from "@/graphql/generated/graphql";
import { RegisterInstructor } from "@/graphql/mutations/register-instructor.graphql";

const useRegisterInstructor = () => {
  const [registerInstructor, { loading, error }] = useMutation<
    RegisterInstructorMutation,
    RegisterInstructorMutationVariables
  >(RegisterInstructor);

  return { registerInstructor, loading, error };
};

export default useRegisterInstructor;
