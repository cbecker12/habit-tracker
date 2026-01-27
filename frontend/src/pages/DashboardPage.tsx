import { useEffect, useState } from "react" 
import Dashboard from '../components/dashboard/Dashboard'
import { fetchHabits } from "../api/habits" 
import type { Habit } from "../types/habit" 

const DashboardPage = () => { 
    const [habits, setHabits] = useState<Habit[]>([]) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null) 

    useEffect(() => { 
        fetchHabits() 
            .then(setHabits) 
            .catch((err) => setError(err.message)) 
            .finally(() => setLoading(false)) 
    }, []) 

    if(loading) { 
        return <p>Loading habits...</p> 
    } 

    if(error) { 
        return <p>Error: {error}</p>
    }

    return (
        <main>
            <h1>Habit Tracker</h1>
            <Dashboard habits={habits} />
        </main> 
    ) 
}

export default DashboardPage 