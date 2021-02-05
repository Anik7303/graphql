const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        hello: String!
        test(value: String!): String!
    }
`);
