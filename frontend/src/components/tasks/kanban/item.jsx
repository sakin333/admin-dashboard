import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const KanbanItem = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderRadius: "8px",
    cursor: "grab",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    zIndex: isDragging ? 1000 : "auto",
    // position: isDragging ? "absolute" : "relative",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        opacity: isDragging ? 0.8 : 1,
        marginBottom: "16px",
      }}
    >
      {children}
    </div>
  );
};

export default KanbanItem;
