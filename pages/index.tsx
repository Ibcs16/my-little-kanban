import { useCycle } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Board } from "../components";
import AddTaskModal from "../components/AddTaskModal";
import BoardDescription from "../components/BoardDescription";
import BoardTitle from "../components/BoardTitle";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

import SearchBox from "../features/todos/Searchbox";
import StatusFilter from "../components/StatusFilter";
import {
  fetchTodos,
  selectAllTodos,
  selectLoadTodosApiStatus,
} from "../features/todos/todosSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectLoadTodosApiStatus);
  const [showModal, toggleShowModal] = useCycle(false, true);

  const handleOpenModal = () => toggleShowModal();

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
          <div className="boardHeader">
            <div className="boardInfoWrapper">
              <BoardTitle>Tasks</BoardTitle>
              <BoardDescription>
                This is your personal kanban, to help you organize and aways be
                aware of your activities 😉
              </BoardDescription>
            </div>
            <div className="searchWrapper">
              <StatusFilter />
              <SearchBox />
              <Button
                hideLabelOnMobile
                label="Add task"
                icon="plus"
                onClick={handleOpenModal}
              />
            </div>
            <AddTaskModal
              visible={showModal}
              onClose={handleOpenModal}
              listStatus={"todo"}
            />
          </div>
          <Board />
        </main>
      )}
    </div>
  );
};

export default Home;
