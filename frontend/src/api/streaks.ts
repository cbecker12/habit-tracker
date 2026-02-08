import type { Streak } from "../types/streak" 

const API_BASE = "http://localhost:5000/api" 

export async function fetchStreaks(): Promise<Streak[]> { 
    const res = await fetch(`${API_BASE}/streaks`) 
    if(!res.ok) { 
        throw new Error("Failed to fetch streaks")
    }
    return res.json() 
} 
