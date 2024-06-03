import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { useSelector } from "react-redux";

const KanbanItem = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });
  const { activeId } = useSelector((state) => state.activeId);

  const style = {
    transform: CSS.Translate.toString(transform),
    position: isDragging ? "absolute" : "relative",
    borderRadius: "8px",
    marginBottom: "16px",
    cursor: "grab",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    zIndex: isDragging ? 1000 : "auto",
    opacity: activeId === id ? 1 : activeId ? 0.7 : 1,
    width: "232px",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default KanbanItem;
