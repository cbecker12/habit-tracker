import type { Habit } from "../types/habit" 

const API_BASE = "http://localhost:5000/api" 

export async function fetchHabits(): Promise<Habit[]> {
    const res = await fetch(`${API_BASE}/habits/`) 

    if (!res.ok) { 
        throw new Error("Failed to fetch habits") 
    }

    return res.json() 
}