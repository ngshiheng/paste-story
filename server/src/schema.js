const { gql } = require('apollo-server-cloudflare')

module.exports = gql`
    type Paste {
        uuid: ID!
        content: String!
        createdOn: String!
        expireAt: String!
    }

    type Query {
        getPaste(uuid: ID!): Paste!
    }

    type Mutation {
        createPaste(content: String!): Paste!
    }
`
