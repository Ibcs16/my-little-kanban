import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { Board } from "../components";
import SearchBox from "../features/todos/SearchBox";
import StatusFilter from "../features/todos/StatusFilter";
import { fetchTodos } from "../features/todos/todosSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
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
