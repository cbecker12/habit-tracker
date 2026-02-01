import { useState } from "react" 
import type { Habit } from "../../types/habit.ts" 

interface AddCompletionFormProps { 
    habits: Habit[] 
    onAddCompletion: (habit_id: number, date: string) => void 
}

const AddCompletionForm = ({ onAddCompletion, habits }: AddCompletionFormProps) => { 
    const [habitId, setHabitId] = useState<number | "">("") 
    const [date, setDate] = useState("") 

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault() 

        if(habitId == "" || !date) return 

        onAddCompletion(habitId, date) 
        setDate("") 
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <select value={habitId} onChange={(e) => setHabitId(Number(e.target.value))}> 
                <option value="">Select habit</option>
                {habits.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                ))}
            </select> 
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> 
            <button type="submit">Add Completion</button>
        </form>
    )
} 

export default AddCompletionForm 