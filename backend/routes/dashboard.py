from flask import Blueprint, jsonify
from datetime import date
from backend.db import get_connection
from backend.routes.habits import get_current_streak

dashboard_bp = Blueprint("dashboard", __name__) 

@dashboard_bp.route("/", methods=["GET"]) 
def dashboard(): 
    today = date.today().isoformat() 

    conn = get_connection() 
    cursor = conn.cursor() 

    habits = cursor.execute(
        "SELECT id, name FROM habits ORDER BY created_at ASC"
    ).fetchall() 

    dashboard_habits = [] 

    for habit in habits: 
        habit_id = habit["id"] 

        completed_today = cursor.execute(
            "SELECT 1 FROM completions WHERE habit_id = ? AND date = ?", 
            (habit_id, today) 
        ).fetchone() is not None 

        streak = get_current_streak(habit_id)

        dashboard_habits.append({
            "id": habit_id, 
            "name": habit["name"], 
            "completed_today": completed_today, 
            "streak": streak 
        })

    return jsonify({
        "date": today, 
        "habits": dashboard_habits 
    })