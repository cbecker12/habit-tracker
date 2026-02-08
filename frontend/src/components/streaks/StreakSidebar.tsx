import type { Streak } from "../../types/streak"

interface StreakSidebarProps { 
    streaks: Streak[] 
}

const StreakSidebar = ({streaks}: StreakSidebarProps) => { 
    
    return (
        <div>
            <h3>Current Streaks:</h3> 
            {streaks.map((s) => (
                <p>{s.habitName}: {s.currentStreak}</p> 
            ))}
        </div>
    )
} 

export default StreakSidebar 