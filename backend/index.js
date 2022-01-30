const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");
const dbURL = process.env.dbURL;
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.body.operationName);
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
mongoose.connect(dbURL);

// First we create the schema
const languageSchema = new mongoose.Schema({
  name: String,
});

// Documentation Link: https://mongoosejs.com/docs/guide.html
// Creates a method accesible to language Schema
languageSchema.methods.phrase = function phrase() {
  const greeting = this.name
    ? "We are speaking" + this.name
    : "I don't know this Language";
  console.log(greeting);
};

// then we create the model from the schema
const Lanugage = mongoose.model("Language", languageSchema);

// now we create document using our model
const english = new Lanugage({ name: "English" });

// Saves the document to the database
english.save();

// Calls the method
english.phrase();
async function callLanuages() {
  // finds all documents in the database
  const random = await Lanugage.find();
  console.log(random);
}

callLanuages();
