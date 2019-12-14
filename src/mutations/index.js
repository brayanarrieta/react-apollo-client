import gql from 'graphql-tag';

export const CREATE_CLIENT_MUTATION = gql`
    mutation createClient($input: ClientInput) {
        createClient(input: $input) {
            id
            name
            lastname
        }
    }
`;