import React from "react";
import {
  KanbanBoard,
  KanbanBoardContainer,
} from "../../components/tasks/kanban/board";
import KanbanColumn from "../../components/tasks/kanban/column";
import KanbanItem from "../../components/tasks/kanban/item";

const List = () => {
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn>
            <KanbanItem>To do list</KanbanItem>
          </KanbanColumn>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;
