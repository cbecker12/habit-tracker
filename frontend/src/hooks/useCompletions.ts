import { useState } from "react" 
import { /*fetchCompletions,*/ createCompletion, deleteCompletion } from "../api/completions" 

export function useCompletions() { 
    //const [completions, setCompletions] = useState<string | null>(null) 
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState<string | null>(null) 

    /*const loadCompletions = async () => { 
        try { 
            setLoading(true) 
            const data = await fetchCompletions() 
            setCompletions(data) 
            setError(null) 
        } catch(err) { 
            setError((err as Error).message) 
        } finally { 
            setLoading(false) 
        }
    }*/ 

    const addCompletion = async (habit_id: number, date: string) => { 
        setLoading(true) 
        setError(null) 
        try { 
            await createCompletion(habit_id, date) 
        } catch(err) { 
            setError((err as Error).message)
        } finally { 
            setLoading(false) 
        }
    } 

    const removeCompletion = async (habit_id: number, date: string) => { 
        try { 
            setLoading(true) 
            await deleteCompletion(habit_id, date) 
        } catch (err) { 
            setError((err as Error).message) 
        } finally { 
            setLoading(false) 
        }
    }

    return { 
        addCompletion, 
        removeCompletion, 
        loading, 
        error
    }
} 
