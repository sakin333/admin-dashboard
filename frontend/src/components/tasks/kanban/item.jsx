import { DragOverlay, useDraggable } from "@dnd-kit/core";
import React from "react";

const KanbanItem = ({ children, id, data }) => {
  const { attributes, listners, setNodeRef, active } = useDraggable({
    id: "",
    dataa: "data",
  });
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                borderRadius: "8px",
                cursor: "grabbing",
              }}
            >
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
};

export default KanbanItem;
