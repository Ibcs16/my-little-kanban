import type { NextPage } from "next";
import Head from "next/head";
import SearchBox from "../features/todos/SearchBox";
import TodoList from "../features/todos/TodoList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Little Kanban</title>
        <meta name="description" content="A simple personal kanban" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: "2em" }}>
        <h1>Welcome</h1>
        <SearchBox />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TodoList status="todo" />
          <TodoList status="doing" />
          <TodoList status="done" />
        </div>
      </main>
    </div>
  );
};

export default Home;
