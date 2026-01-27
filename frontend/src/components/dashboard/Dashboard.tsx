import type { Habit } from "../../types/habit" 

interface DashboardProps { 
    habits: Habit[] 
}

const Dashboard = ({ habits }: DashboardProps) => { 

    return ( 
        <section>
            <h2>Your Habits</h2>
            {habits.length===0 ? (<p>No habits yet.</p>) : (
                <ul>
                    {habits.map((habit) => (
                        <li key={habit.id}>{habit.name}</li>
                    ))}
                </ul>
            )}
        </section>
    )
} 

export default Dashboard 