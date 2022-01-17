import type { NextPage } from "next";
import Head from "next/head";
import { Board } from "../components";
import SearchBox from "../features/todos/SearchBox";
import StatusFilter from "../features/todos/StatusFilter";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Little Kanban</title>
        <meta name="description" content="A simple personal kanban" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: "2em" }}>
        <SearchBox />
        <StatusFilter />
        <Board />
      </main>
    </div>
  );
};

export default Home;
