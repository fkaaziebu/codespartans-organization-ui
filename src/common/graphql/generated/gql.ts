/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AssignCourseVersionForReview($versionId: String!, $adminId: String!) {\n  assignCourseVersionForReview(versionId: $versionId, adminId: $adminId) {\n    id\n  }\n}": typeof types.AssignCourseVersionForReviewDocument,
    "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}": typeof types.RegisterAdminDocument,
    "mutation RegisterInstructor($name: String!, $email: String!, $password: String!) {\n  registerInstructor(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}": typeof types.RegisterInstructorDocument,
    "mutation RegisterOrganization($name: String!, $email: String!, $password: String!) {\n  registerOrganization(name: $name, email: $email, password: $password) {\n    message\n  }\n}": typeof types.RegisterOrganizationDocument,
    "query GetStats {\n  getStats {\n    total_admins\n    total_assigned_reviews\n    total_completed_reviews\n    total_instructors\n    total_requested_reviews\n  }\n}": typeof types.GetStatsDocument,
    "query ListAdmins($searchTerm: String, $pagination: PaginationInput) {\n  listAdmins(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        email\n        name\n        total_course_versions\n        total_approved_course_versions\n      }\n    }\n  }\n}": typeof types.ListAdminsDocument,
    "query ListInstructors($searchTerm: String, $pagination: PaginationInput) {\n  listInstructors(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        name\n        email\n        total_created_courses\n        total_requested_reviews\n        total_approved_courses\n      }\n    }\n  }\n}": typeof types.ListInstructorsDocument,
    "query ListRequestedReviews($filter: RequestedReviewFilterInput, $pagination: PaginationInput) {\n  listRequestedReviews(filter: $filter, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        course_version {\n          id\n          status\n          assigned_admin {\n            name\n          }\n          course {\n            title\n            instructor {\n              name\n            }\n            approved_version {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}": typeof types.ListRequestedReviewsDocument,
    "query LoginOrganization($email: String!, $password: String!) {\n  loginOrganization(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n  }\n}": typeof types.LoginOrganizationDocument,
};
const documents: Documents = {
    "mutation AssignCourseVersionForReview($versionId: String!, $adminId: String!) {\n  assignCourseVersionForReview(versionId: $versionId, adminId: $adminId) {\n    id\n  }\n}": types.AssignCourseVersionForReviewDocument,
    "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}": types.RegisterAdminDocument,
    "mutation RegisterInstructor($name: String!, $email: String!, $password: String!) {\n  registerInstructor(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}": types.RegisterInstructorDocument,
    "mutation RegisterOrganization($name: String!, $email: String!, $password: String!) {\n  registerOrganization(name: $name, email: $email, password: $password) {\n    message\n  }\n}": types.RegisterOrganizationDocument,
    "query GetStats {\n  getStats {\n    total_admins\n    total_assigned_reviews\n    total_completed_reviews\n    total_instructors\n    total_requested_reviews\n  }\n}": types.GetStatsDocument,
    "query ListAdmins($searchTerm: String, $pagination: PaginationInput) {\n  listAdmins(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        email\n        name\n        total_course_versions\n        total_approved_course_versions\n      }\n    }\n  }\n}": types.ListAdminsDocument,
    "query ListInstructors($searchTerm: String, $pagination: PaginationInput) {\n  listInstructors(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        name\n        email\n        total_created_courses\n        total_requested_reviews\n        total_approved_courses\n      }\n    }\n  }\n}": types.ListInstructorsDocument,
    "query ListRequestedReviews($filter: RequestedReviewFilterInput, $pagination: PaginationInput) {\n  listRequestedReviews(filter: $filter, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        course_version {\n          id\n          status\n          assigned_admin {\n            name\n          }\n          course {\n            title\n            instructor {\n              name\n            }\n            approved_version {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.ListRequestedReviewsDocument,
    "query LoginOrganization($email: String!, $password: String!) {\n  loginOrganization(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n  }\n}": types.LoginOrganizationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AssignCourseVersionForReview($versionId: String!, $adminId: String!) {\n  assignCourseVersionForReview(versionId: $versionId, adminId: $adminId) {\n    id\n  }\n}"): (typeof documents)["mutation AssignCourseVersionForReview($versionId: String!, $adminId: String!) {\n  assignCourseVersionForReview(versionId: $versionId, adminId: $adminId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}"): (typeof documents)["mutation RegisterAdmin($name: String!, $email: String!, $password: String!) {\n  registerAdmin(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterInstructor($name: String!, $email: String!, $password: String!) {\n  registerInstructor(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}"): (typeof documents)["mutation RegisterInstructor($name: String!, $email: String!, $password: String!) {\n  registerInstructor(name: $name, email: $email, password: $password) {\n    id\n    email\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterOrganization($name: String!, $email: String!, $password: String!) {\n  registerOrganization(name: $name, email: $email, password: $password) {\n    message\n  }\n}"): (typeof documents)["mutation RegisterOrganization($name: String!, $email: String!, $password: String!) {\n  registerOrganization(name: $name, email: $email, password: $password) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStats {\n  getStats {\n    total_admins\n    total_assigned_reviews\n    total_completed_reviews\n    total_instructors\n    total_requested_reviews\n  }\n}"): (typeof documents)["query GetStats {\n  getStats {\n    total_admins\n    total_assigned_reviews\n    total_completed_reviews\n    total_instructors\n    total_requested_reviews\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListAdmins($searchTerm: String, $pagination: PaginationInput) {\n  listAdmins(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        email\n        name\n        total_course_versions\n        total_approved_course_versions\n      }\n    }\n  }\n}"): (typeof documents)["query ListAdmins($searchTerm: String, $pagination: PaginationInput) {\n  listAdmins(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        email\n        name\n        total_course_versions\n        total_approved_course_versions\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListInstructors($searchTerm: String, $pagination: PaginationInput) {\n  listInstructors(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        name\n        email\n        total_created_courses\n        total_requested_reviews\n        total_approved_courses\n      }\n    }\n  }\n}"): (typeof documents)["query ListInstructors($searchTerm: String, $pagination: PaginationInput) {\n  listInstructors(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        name\n        email\n        total_created_courses\n        total_requested_reviews\n        total_approved_courses\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListRequestedReviews($filter: RequestedReviewFilterInput, $pagination: PaginationInput) {\n  listRequestedReviews(filter: $filter, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        course_version {\n          id\n          status\n          assigned_admin {\n            name\n          }\n          course {\n            title\n            instructor {\n              name\n            }\n            approved_version {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ListRequestedReviews($filter: RequestedReviewFilterInput, $pagination: PaginationInput) {\n  listRequestedReviews(filter: $filter, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        course_version {\n          id\n          status\n          assigned_admin {\n            name\n          }\n          course {\n            title\n            instructor {\n              name\n            }\n            approved_version {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LoginOrganization($email: String!, $password: String!) {\n  loginOrganization(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n  }\n}"): (typeof documents)["query LoginOrganization($email: String!, $password: String!) {\n  loginOrganization(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;