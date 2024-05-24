import React, { useMemo, useEffect } from "react";
import {
  KanbanBoard,
  KanbanBoardContainer,
} from "../../components/tasks/kanban/board";
import KanbanColumn from "../../components/tasks/kanban/column";
import KanbanItem from "../../components/tasks/kanban/item";
import { useDispatch, useSelector } from "react-redux";
import { stages } from "../../constants";
import { fetchTasks, updateTask } from "../../redux/actions/taskAction";
import ProjectCard from "../../components/tasks/kanban/card";
import { Row, Spin } from "antd";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../redux/actions/modalAction";

const List = ({ children }) => {
  const { tasks, loading } = useSelector((state) => state.task);
  const modalState = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const taskStages = useMemo(() => {
    if (!tasks || stages.length === 0) {
      return [];
    }
    const taskWithStages = tasks.map((task) => {
      const stage = stages.find((stage) => stage.stageId === task.stageId);
      return {
        ...task,
        stage: stage?.value || "Unknown",
      };
    });
    return taskWithStages;
  }, [tasks]);

  const getTaskByStatus = (status) =>
    taskStages.filter((task) => task.stage === status);

  const handleAddCard = (label) => () => {
    dispatch(showModal());
    console.log(modalState);
    navigate(`new?stage=${label}`);
  };

  const handleUpdateTask = (taskId, activeTaskStageId, overColumnId) => {
    dispatch(updateTask(taskId, overColumnId, activeTaskStageId));
  };

  return (
    <>
      <div
        style={{
          height: "93vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Spin tip="Loading" size="large" style={{ marginTop: "-120px" }} />
        ) : (
          <KanbanBoardContainer>
            <KanbanBoard tasks={taskStages} handleUpdateTask={handleUpdateTask}>
              <Row gutter={20} style={{ padding: 16 }}>
                {stages.map((stage) => (
                  <SortableContext
                    key={stage.stageId}
                    items={getTaskByStatus(stage.value).map((task) => task._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <KanbanColumn
                      id={stage.stageId}
                      title={stage.value}
                      count={getTaskByStatus(stage.value).length || 0}
                      onAddClick={handleAddCard(stage.label)}
                    >
                      {getTaskByStatus(stage.value).length !== 0 &&
                        getTaskByStatus(stage.value).map((task) => (
                          <KanbanItem key={task._id} id={task._id} data={task}>
                            <ProjectCard
                              id={task._id}
                              title={task.title}
                              dueDate={task.dueDate}
                              users={task.users}
                            />
                          </KanbanItem>
                        ))}
                      {getTaskByStatus(stage.value).length === 0 && (
                        <p
                          style={{
                            textAlign: "center",
                            opacity: 0.6,
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          No Task
                        </p>
                      )}
                    </KanbanColumn>
                  </SortableContext>
                ))}
              </Row>
            </KanbanBoard>
          </KanbanBoardContainer>
        )}
      </div>
      {children}
    </>
  );
};

export default List;
