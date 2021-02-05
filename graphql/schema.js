const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    input UserInputData {
        username: String
        email: String!
        password: String!
    }

    input ProfileInputData {
        _id: ID!
        image: String!
    }

    type User {
        _id: ID!
        username: String
        email: String!
        password: String
        image: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        hello: String!
        test(value: String!): String!
        allUsers: [User]
    }

    type Mutation {
        createUser(data: UserInputData!): User!
        addProfilePic(data: ProfileInputData!): User!
    }
`);
