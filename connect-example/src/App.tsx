import "./App.css";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { ElizaService } from "./gen/eliza_pb";
import { useState } from "react";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const client = createClient(ElizaService, transport);

function App() {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await client.say({ sentence: inputValue });
    console.log(data.sentence);
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default App;
