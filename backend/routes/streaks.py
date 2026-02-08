from flask import Blueprint, jsonify, request 
from backend.db import get_connection 
import sqlite3 
from datetime import date, timedelta 

# /api/streaks 
streaks_bp = Blueprint("streaks", __name__) 

# GET / 

@streaks_bp.route("/", methods=["GET"]) 
def get_streaks(): 
    conn = get_connection() 
    cursor = conn.cursor() 

    completion_rows = cursor.execute(
        "SELECT habit_id, date FROM completions"
    ).fetchall() 

    habit_rows = cursor.execute( 
        "SELECT id, name FROM habits"
    ).fetchall() 

    conn.close() 
    comps = [dict(row) for row in completion_rows] 

    habit_names = { 
        row["id"]: row["name"] for row in habit_rows
    } 

    today = date.today() 
    today_str = today.isoformat() 

    habit_dates = {} 

    for comp in comps: 
        habit_id = comp["habit_id"] 
        date_str = comp["date"] 

        if habit_id in habit_dates: 
            habit_dates[habit_id].add(date_str) 
        else: 
            habit_dates[habit_id] = {date_str} 

    streaks = [] 

    for habit_id, dates in habit_dates.items(): 
        if today_str not in dates: 
            continue 

        count = 0 
        tmp_day = today 
        while tmp_day.isoformat() in dates: 
            count += 1 
            tmp_day -= timedelta(days=1) 

        streaks.append({
            "habitId": habit_id, 
            "habitName": habit_names.get(habit_id, "Unknown"), 
            "currentStreak": count 
        })

    return jsonify(streaks) 
