import { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TasksContext } from "../../context/TasksContext";
import { text } from "stream/consumers";

export const Tasks: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const { tasks, setTasks } = useContext(TasksContext);

  // funcao disparada quando o usuario está querendo adicionar uma nova tarefa
  function handleSubmitAddTask(event: FormEvent) {
    event.preventDefault();

    if (taskTitle.length < 3) {
      alert("Não é possível adicionar tarefas com menos de 3 letras.");
    }

    // adiciona a tarefa
    const newTasks = [
      ...tasks, //pega todas as tarefas que existem e coloca nesse novo valor do estado de tarefas
      { id: new Date().getTime(), title: taskTitle, done: false, delete: "" },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTaskTitle("");
  }

  function randleToggleTaskStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleRemoveTask(taskId: number) {
    const removeTasks = tasks.filter((task) => {
      if (taskId !== task.id) {
        return {
          ...task,
          delete: task.id,
        };
      }
    });
    setTasks(removeTasks);
    localStorage.setItem("tasks", JSON.stringify(removeTasks));
  }
  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmitAddTask}>
        <div>
          <label htmlFor="taskTitle">Adicionar Tarefa</label>
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            type="text"
            id="taskTitle"
            placeholder="Título da tarefa"
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                onChange={() => {
                  randleToggleTaskStatus(task.id);
                }}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={task.done ? styles.done : ""}
              >
                {task.title}{" "}
              </label>
              <button
                className={styles.buttonRemove}
                onClick={() => {
                  handleRemoveTask(task.id);
                }}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
