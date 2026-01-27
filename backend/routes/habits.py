from flask import Blueprint, jsonify, request 
from backend.db import get_connection 
from datetime import date, timedelta 
import sqlite3 

# /api/habits 
habits_bp = Blueprint("habits", __name__) 

# GET / 

@habits_bp.route("/", methods=["GET"]) 
def get_habits(): 
    conn = get_connection() 
    rows = conn.execute("SELECT * FROM habits").fetchall() 
    conn.close() 

    habits = [dict(row) for row in rows]
    return jsonify(habits) 

# POST / 

@habits_bp.route("/", methods=["POST"]) 
def add_habit(): 
    data = request.json 
    name = data.get("name") 

    if not name: 
        return jsonify({"error": "name is required"}), 400 

    conn = get_connection() 
    cursor = conn.cursor() 

    try: 
        cursor.execute(
            "INSERT INTO habits (name, created_at) VALUES (?, datetime('now'))",
            (name,)
        ) 
        conn.commit() 
    except sqlite3.IntegrityError: 
        conn.close() 
        return jsonify({"error": "habit already exists"}), 409 

    habit_id = cursor.lastrowid 
    conn.close() 

    return jsonify({
        "id": habit_id, 
        "name": name, 
    }), 201 

# GET /<int:habit_id>/streak 

@habits_bp.route("/<int:habit_id>/streak", methods=["GET"]) 
def habit_streak(habit_id): 
    streak = get_current_streak(habit_id) 
    return jsonify({"habit_id": habit_id, "streak": streak}) 

def get_completion_dates(habit_id): 
    conn = get_connection() 
    cursor = conn.cursor() 
    cursor.execute("""
        SELECT date
        FROM completions
        WHERE habit_id = ?
        ORDER BY date DESC            
        """,
        (habit_id,)
    )
    rows = cursor.fetchall() 
    conn.close() 
    return [row["date"] for row in rows] 
    

def get_current_streak(habit_id): 
    dates = get_completion_dates(habit_id) 
    return calculate_streak(dates) 

def calculate_streak(completed_dates): 
    """
    completed_dates: array of 'YYYY-MM-DD' strings 
    """
    if not completed_dates: 
        return 0 
    
    completed = set(completed_dates) 

    streak = 0 
    current_day = date.today() 

    while True: 
        day_str = current_day.isoformat() 

        if day_str in completed: 
            streak += 1 
            current_day -= timedelta(days=1) 
        else: 
            break 

    return streak 
