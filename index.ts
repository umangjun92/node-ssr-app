const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	# This "Book" type defines the queryable fields for every book in our data source.
    """
    Has Title of the book and details of the Author
    """
	type Book {
		title: String
		author: Author
	}

    """
    Name of Author & list of Books
    """
    type Author {
        name: String
        books: [Book]
    }

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		getBooks: [Book]
        searchBooks(query: String): [Book]
	}
`;

const books = [
	{
		title: "Harry Potter and the Chamber of Secrets",
		author: "J.K. Rowling",
	},
	{
		title: "Jurassic Park",
		author: "Michael Crichton",
	},
];
// { "watch": ["*.ts"], "ignore": ["src/**/*.spec.ts"], "exec": "ts-node ./index.ts" }
const resolvers = {
	Query: {
        getBooks: () => books,
        searchBooks: (query: string) => {
            return books.filter(book => book.title.includes(query) || book.author.includes(query))
        }
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
