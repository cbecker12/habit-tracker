import CalendarView from "../components/calendar/CalendarView"
import Dashboard from "../components/dashboard/Dashboard" 
import { useCompletions } from "../hooks/useCompletions" 
import { useHabits } from "../hooks/useHabits" 
import { useCalendar } from "../hooks/useCalendar" 
import { useStreaks } from "../hooks/useStreaks"
import { useState } from "react" 
import StreakSidebar from "../components/streaks/StreakSidebar"

const DashboardPage = () => {
  const today = new Date() 
  const [year, setYear] = useState(today.getFullYear()) 
  const [month, setMonth] = useState(today.getMonth()) 

  const { data, loading: calendarLoading, error: calendarError, refresh } = useCalendar(year, month) 
  const { habits, loading, error, addHabit, removeHabit } = useHabits() 
  const { addCompletion, loading: completionLoading, error: completionError } = useCompletions() 
  const { streaks, loading: streaksLoading, error: streaksError, reloadStreaks} = useStreaks() 

  const handleAddCompletion = async(habitId: number, date: string) => { 
    await addCompletion(habitId, date) 
    refresh() 
    reloadStreaks() 
  }

  const goPrevMonth = () => { 
          if(month === 0) { 
              setMonth(11) 
              setYear(prev => prev-1) 
          } else { 
              setMonth(prev => prev-1) 
          }
      } 
  
  const goNextMonth = () => { 
      if(month === 11) { 
          setMonth(0) 
          setYear(prev => prev+1) 
      } else { 
          setMonth(prev => prev+1) 
      }
  }

  if (loading || completionLoading || calendarLoading || streaksLoading) return <p>Loading data...</p> 
  if (error) return <p>Error: {error}</p> 
  if (completionError) return <p>Error: {completionError}</p> 
  if (calendarError) return <p>Error: {calendarError}</p> 
  if (streaksError) return <p>Error: {streaksError}</p>

  return (
    <div className="app-container"> 
      <main>
        <div className="layout-grid">
          <h1>Habit Tracker</h1>
          <Dashboard habits={habits} onAddHabit={addHabit} onDeleteHabit={removeHabit} onAddCompletion={handleAddCompletion} /> 
          <CalendarView year={year} month={month} data={data} habits={habits} onPrevMonth={goPrevMonth} onNextMonth={goNextMonth} /> 
        </div> 
        <StreakSidebar streaks={streaks} /> 
      </main>
    </div> 
  ) 
} 

export default DashboardPage 
