import type { Habit } from "../../types/habit" 
import AddHabitForm from "./AddHabitForm" 
import AddCompletionForm from "./AddCompletionForm" 

interface DashboardProps {
  habits: Habit[];
  onAddHabit: (name: string) => void 
  onDeleteHabit: (id: number) => void 
  onAddCompletion: (habitId: number, date:string) => void 
}

const Dashboard = ({ habits, onAddHabit, onDeleteHabit, onAddCompletion }: DashboardProps) => {
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
      <br/>
      <AddCompletionForm onAddCompletion={onAddCompletion} habits={habits} /> 
    </section>
  );
};

export default Dashboard;
