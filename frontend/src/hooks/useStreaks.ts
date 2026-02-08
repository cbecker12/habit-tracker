import { fetchStreaks } from "../api/streaks" 
import type {Streak} from "../types/streak" 
import { useState, useEffect } from "react" 

export function useStreaks() { 
    const [streaks, setStreaks] = useState<Streak[]>([]) 
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState<string | null>(null) 

    const loadStreaks = async () => { 
        try { 
            setLoading(true) 
            const data = await fetchStreaks() 
            setStreaks(data) 
            setError(null) 
        } catch (err) { 
            setError((err as Error).message) 
        } finally { 
            setLoading(false) 
        }
    } 

    useEffect(() => { 
        loadStreaks() 
    }, [])

    return { 
        streaks, 
        loading, 
        error, 
        reloadStreaks: loadStreaks 
    } 
} 
