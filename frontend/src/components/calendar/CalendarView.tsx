import type { Habit } from "../../types/habit" 
import "../../styles/CalendarView.css" 

/*type CalendarView = Record<string, number[]> 

const mockCalendarData: Record<string, number[]> = { 
    "2026-01-03": [1, 2], 
    "2026-01-07": [2], 
    "2026-01-12": [1, 3], 
}

const mockHabits: Habit[] = [ 
    { id: 1, name: "Read" }, 
    { id: 2, name: "Swim" }, 
    { id: 3, name: "Nap" }, 
] */ 

interface CalendarViewProps { 
    year: number, 
    month: number, 
    data: Record<string, number[]> 
    habits: Habit[] 
    onPrevMonth: () => void 
    onNextMonth: () => void 
    onDeleteCompletion: (habit_id: number, date: string) => void 
} 

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] 

const CalendarView = ({year, month, data, habits, onPrevMonth, onNextMonth, onDeleteCompletion}: CalendarViewProps) => { 

    const firstDayOfMonth = new Date(year, month, 1) 
    const lastDayOfMonth = new Date(year, month+1, 0) 

    const daysInMonth = lastDayOfMonth.getDate() 
    const startWeekday = firstDayOfMonth.getDay() 

    const monthLabel = firstDayOfMonth.toLocaleString("default", {
        month: "long", 
        year: "numeric", 
    }) 

    const getHabitsForDate = (dateStr: string): Habit[] => { 
        const habitIds = data[dateStr] || [] 
        return habits.filter((h) => habitIds.includes(h.id))
    } 

    const nameFilter = (name: string): string => { 
        if(name.length <= 5) { 
            return name 
        }
        return name.substring(0, 5) + "..."
    }

    const cells: React.ReactNode[] = [] 

    for (let i = 0; i < startWeekday; i++) { 
        cells.push(<div key={`empty-${i}`} className="day empty" />) 
    } 

    for (let day = 1; day <= daysInMonth; day++) { 
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` 
        const dayHabits = getHabitsForDate(dateStr) 

        cells.push( 
            <div key={dateStr} className="day">
                <div className="day-number">{day}</div> 
                <div className="habit-markers"> 
                    {dayHabits.map( habit => (
                        <div key={habit.id} className="habit-marker">
                            {nameFilter(habit.name)} <button onClick={() => onDeleteCompletion(habit.id, dateStr)}>❌</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return ( 
        <section>
            <header>
                <h2>{monthLabel}</h2>
                <button onClick={onPrevMonth}>{"⬅"}</button>
                <button onClick={onNextMonth}>{"➡"}</button>
            </header>

            <div className="calendar-grid" style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)", 
                gap: "0.5rem", marginTop: "1rem", 
            }}>
                {weekdayLabels.map(d => (
                    <div key={d} className="weekdays" style={{ fontWeight: "bold", textAlign: "center" }}>
                        {d} 
                    </div> 
                ))}
                {cells} 
            </div>
        </section>
    )
} 

export default CalendarView 