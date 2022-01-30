import logo from "./logo.svg";
import "./App.css";
import { gql } from "@apollo/client";

function App() {
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
