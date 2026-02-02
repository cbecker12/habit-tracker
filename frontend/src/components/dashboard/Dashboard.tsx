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

  const buttonStyle = { 
    background: 'none', 
    border: 'none', 
    padding: 0, 
    cursor: 'pointer', 
    outline: 'inherit', 
    marginLeft: "0.5rem" 
  }

  return (
    <section>
      <AddHabitForm onAddHabit={onAddHabit} />

      <ul style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem"}}>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name}
            <button onClick={() => onDeleteHabit(habit.id)} style={buttonStyle}> 
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
