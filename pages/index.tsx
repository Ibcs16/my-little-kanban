import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Board } from "../components";
import BoardDescription from "../components/BoardDescription";
import BoardTitle from "../components/BoardTitle";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import SearchBox from "../features/todos/Searchbox";
import StatusFilter from "../features/todos/StatusFilter";
import { fetchTodos, selectApiStatus } from "../features/todos/todosSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiStatus);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div id="content">
      <Head>
        <title>My Little Kanban</title>
        <meta name="description" content="A simple personal kanban" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {apiStatus === "loading" && <Spinner />}
      {apiStatus === "idle" && (
        <main>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <BoardTitle>Tasks</BoardTitle>
              <BoardDescription>
                This is your personal kanban, to help you organize and aways be
                aware of your activities 😉
              </BoardDescription>
            </div>
            <div>
              <SearchBox />
              <StatusFilter />
            </div>
            <Button label="Add task" icon="plus" />
          </div>
          <Board />
        </main>
      )}
    </div>
  );
};

export default Home;
