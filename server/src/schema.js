const { gql } = require('apollo-server-cloudflare')

module.exports = gql`
    type Paste {
        uuid: ID!
        content: String!
        url: String!
    }

    type Query {
        getPaste(uuid: ID!): Paste!
    }

    type Mutation {
        createPaste(content: String!): Paste!
    }
`
