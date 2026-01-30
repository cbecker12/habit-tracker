import type { Habit } from "../../types/habit";
import AddHabitForm from "./AddHabitForm";

interface DashboardProps {
  habits: Habit[];
  onAddHabit: (name: string) => void 
  onDeleteHabit: (id: number) => void 
}

const Dashboard = ({ habits, onAddHabit, onDeleteHabit }: DashboardProps) => {
  return (
    <section>
      <AddHabitForm onAddHabit={onAddHabit} />

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name}
            <button onClick={() => onDeleteHabit(habit.id)} style={{ marginLeft: "0.5rem" }}> 
                ❌ 
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
