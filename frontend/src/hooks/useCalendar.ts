import { useEffect, useState } from "react" 
import { fetchCalendar } from "../api/completions" 

type CalendarData = Record<string, number[]> 

export function useCalendar(year: number, month:number) { 
    const [data, setData] = useState<CalendarData>({}) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null) 

    const load = () => { 
        setLoading(true) 
        setError(null) 

        fetchCalendar(year, month) 
            .then(setData) 
            .catch(err => setError(err.message)) 
            .finally(() => setLoading(false)) 
    }

    useEffect(load, [year, month])

    return { data, loading, error, refresh: load } 
} 