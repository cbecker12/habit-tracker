
const API_BASE = "http://localhost:5000/api" 

export async function fetchCompletions(): Promise<void> { 
    return 
}

export async function createCompletion(habit_id: string, date: number): Promise<void> { 
    const res = await fetch(`${API_BASE}/completions/`, {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ habit_id, date })
    }) 

    if(!res.ok) { 
        throw new Error("Failed to create completion") 
    } 

    return res.json() 
} 
