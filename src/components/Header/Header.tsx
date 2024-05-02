import { useContext } from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import styles from "./styles.module.scss";
import { TasksContext } from "../../context/TasksContext";

export const Header: React.FC = () => {
  const { tasks } = useContext(TasksContext);

  const totalTasks = tasks.length;
  const totalPending = tasks.reduce((total, task) => {
    if (!task.done) return total + 1;
    return total;
  }, 0);

  const totalDone = totalTasks - totalPending;
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>MyTodo</h1>

          <span> Bem-vinda, Aline! </span>
        </div>
        <div>
          <StatsCard title="Total de tarefas" value={totalTasks} />
          <StatsCard title="Tarefas pendentes" value={totalPending} />
          <StatsCard title="Tarefas concluídas" value={totalDone} />
        </div>
      </div>
    </header>
  );
};
