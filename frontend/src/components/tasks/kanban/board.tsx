import React from 'react'
import { DndContext } from "@dnd-kit/core"

export const KanbanBoardContainer = ({ children }) => {
  return (
    <div
        style={{
            width: 'calc(100% + 64px)',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            margin: '-32px',
        border: "1px solid green",

        }}
    >
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                padding: '32px',
                overflow: 'scroll',
        border: "1px solid blue",

            }}
        >
            {children}
        </div>
    </div>
  )
}

export const  KanbanBoard = ({ children }) => {
    return (
        <DndContext>
            { children}
        </DndContext>
    )
}