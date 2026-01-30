import { useState } from "react" 

interface AddHabitFormProps {
  onAddHabit: (name: string) => void 
}

const AddHabitForm = ({ onAddHabit }: AddHabitFormProps) => {
  const [name, setName] = useState("") 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 

    if (!name.trim()) return 

    onAddHabit(name.trim()) 
    setName("");
  } 

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  ) 
} 

export default AddHabitForm 