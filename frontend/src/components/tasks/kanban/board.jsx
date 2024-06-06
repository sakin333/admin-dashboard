import React, { useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { setActiveId } from "../../../redux/actions/activeIdaction";

export const KanbanBoardContainer = ({ children }) => {
  return (
    <div
      style={{
        width: "calc(100% + 64px)",
        height: "calc(93vh - 64px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "0 32px",
        }}
      >
        <h2>Kanban Board</h2>
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({ children, tasks, handleUpdateTask }) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const activeTask = tasks.find((task) => task._id === active.id);
      const overColumn = over.id;

      if (activeTask.stageId !== overColumn) {
        handleUpdateTask(active.id, activeTask.stageId, overColumn);
      }
    }

    dispatch(setActiveId(null));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => dispatch(setActiveId(event.active.id))}
    >
      {children}
    </DndContext>
  );
};
