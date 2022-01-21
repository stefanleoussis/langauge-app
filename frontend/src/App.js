import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: " http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  const query = () => {
    client
      .query({
        query: gql`
          query GetBooks {
            books {
              title
              author
            }
          }
        `,
      })
      .then((result) => console.log(result));
  };

  return (
    <div className="App">
      <button onClick={query}>Shheeeeesh</button>
    </div>
  );
}

export default App;
