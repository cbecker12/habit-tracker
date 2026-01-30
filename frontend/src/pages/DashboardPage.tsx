import Dashboard from "../components/dashboard/Dashboard";
import { useHabits } from "../hooks/useHabits";

const DashboardPage = () => {
  const { habits, loading, error, addHabit, removeHabit } = useHabits();

  if (loading) return <p>Loading habits...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Habit Tracker</h1>
      <Dashboard habits={habits} onAddHabit={addHabit} onDeleteHabit={removeHabit} />
    </main>
  );
};

export default DashboardPage;
