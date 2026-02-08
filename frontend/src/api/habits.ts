import type { Habit } from "../types/habit" 

const API_BASE = "http://localhost:5000/api" 

export async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch(`${API_BASE}/habits`) 
  if (!res.ok) {
    throw new Error("Failed to fetch habits") 
  }
  return res.json() 
}

export async function createHabit(name: string): Promise<Habit> {
  const res = await fetch(`${API_BASE}/habits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }) 

  if (!res.ok) {
    throw new Error("Failed to create habit") 
  }

  return res.json() 
}

export async function deleteHabit(id: number): Promise<void> { 
    const res = await fetch(`${API_BASE}/habits/${id}`, {
        method: "DELETE", 
        /*headers: { 
            "Content-Type": "application/json", 
        },*/ 
    }) 

    if(!res.ok) { 
        throw new Error("Failed to delete habit") 
    }
}