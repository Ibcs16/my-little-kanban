import { MdAdd } from "react-icons/md";
import Card, { ITEM_TYPE } from "../Card";

import { Container, AddTodoText } from "./styles";

import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAllFilterStatus,
  selectAllTodos,
} from "../../features/todos/todosSlice";

import { Droppable } from "react-beautiful-dnd";
import { TodoList } from "../../features/todos/models/todo";
import Icon from "../Icon";
import AddTaskModal from "../AddTaskModal";
import { useCycle } from "framer-motion";

interface TodoListProps {
  data: TodoList;
}

const List: React.FC<TodoListProps> = ({ data }) => {
  const { statusName, title } = data;
  const todos = useAppSelector(selectAllTodos);
  const filterStatus = useAppSelector(selectAllFilterStatus);
  const [showModal, toggleShowModal] = useCycle(false, true);

  const handleOpenModal = () => toggleShowModal();

  const notInFilter = useMemo(
    () => filterStatus.length > 0 && !filterStatus.includes(data.statusName),
    [filterStatus, data.statusName],
  );

  if (!statusName) return null;

  return (
    <>
      <Droppable
        droppableId={data.id}
        type={ITEM_TYPE}
        isDropDisabled={notInFilter}
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            done={notInFilter}
            {...provided.droppableProps}
            {...snapshot}
            isDraggingOver={
              !snapshot.draggingFromThisWith && !!snapshot.draggingOverWith
            }
            data-testid={`list`}
          >
            <header>
              <div className="titleWrapper">
                <h2>{title || "No status"}</h2>

                {data.cardIds.length > 0 && (
                  <span className="tasksCount">{data.cardIds.length}</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                data-testid="open-modal-button"
              >
                <Icon size={18} name="plus" />
              </button>
            </header>
            <ul>
              {data.cardIds
                ?.map(id => todos[id])
                .map((todo, cardIndex) =>
                  todo ? (
                    <Card key={todo.id} data={todo} index={cardIndex} />
                  ) : null,
                )}
              {provided.placeholder}
              <AddTodoText onClick={handleOpenModal}>
                Add task
                <Icon size={12} name="plus" />
              </AddTodoText>
            </ul>
          </Container>
        )}
      </Droppable>
      <AddTaskModal
        visible={showModal}
        onClose={handleOpenModal}
        listStatus={data.statusName}
      />
    </>
  );
};

export default List;
