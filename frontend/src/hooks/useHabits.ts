import { useEffect, useState } from "react" 
import type { Habit } from "../types/habit" 
import { fetchHabits, createHabit, deleteHabit } from "../api/habits" 

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null) 

  const loadHabits = async () => {
    try {
      setLoading(true) 
      const data = await fetchHabits() 
      setHabits(data) 
      setError(null) 
    } catch (err) {
      setError((err as Error).message) 
    } finally {
      setLoading(false) 
    }
  };

  const addHabit = async (name: string) => {
    try {
      const newHabit = await createHabit(name) 
      setHabits((prev) => [...prev, newHabit]) 
    } catch (err) {
      setError((err as Error).message) 
    }
  } 

  const removeHabit = async (id: number) => { 
    try { 
        await deleteHabit(id) 
        setHabits((prev) => prev.filter((h) => h.id !== id))
    } catch(err) { 
        setError((err as Error).message) 
    }
  }

  useEffect(() => {
    loadHabits() 
  }, []) 

  return {
    habits,
    loading,
    error,
    addHabit,
    removeHabit 
  } 
  //refreshHabits: loadHabits, 
} 
