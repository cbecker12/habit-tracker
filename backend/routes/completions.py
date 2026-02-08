from flask import Blueprint, jsonify, request 
from backend.db import get_connection 
import sqlite3 

# /api/completions 
completions_bp = Blueprint("completions", __name__) 

# GET / 

@completions_bp.route("/", methods=["GET"]) 
def get_completions(): 
    habit_id = request.args.get("habit_id") 
    conn = get_connection() 

    if not habit_id: 
        # Show array of all completions 
        rows = conn.execute("SELECT * FROM completions").fetchall() 
        conn.close() 

        comps = [dict(row) for row in rows] 
        return jsonify(comps), 200 
    
    # Show only selected completion 
    cursor = conn.cursor() 
    cursor.execute(
        "SELECT * FROM completions WHERE habit_id = ? ORDER BY date ASC", 
        (habit_id,) 
    )
    rows = cursor.fetchall() 
    conn.close() 

    comps = [dict(row) for row in rows] 
    return jsonify(comps) 

# POST / 

@completions_bp.route("/", methods=["POST"]) 
def add_completion(): 
    data = request.json 
    habit_id = data.get("habit_id") 
    date_str = data.get("date") 
    
    if not habit_id or not date_str: 
        return jsonify({"error": "habit_id and date required"}), 400 
    
    conn = get_connection() 
    cursor = conn.cursor() 

    try: 
        cursor.execute(
            "INSERT INTO completions (habit_id, date) VALUES (?, ?)",
            (habit_id, date_str)
        )
        conn.commit() 
    except sqlite3.IntegrityError: 
        conn.close() 
        return jsonify({"error": "completion already exists for habit_id and date"}), 409 

    completion_id = cursor.lastrowid 
    conn.close() 

    return jsonify({
        "id": completion_id, 
        "habit_id": habit_id, 
        "date": date_str 
    }), 201 

# DELETE / 

@completions_bp.route("/", methods=["DELETE"]) 
def delete_completion(): 
    data = request.json
    habit_id = data["habit_id"] 
    date = data["date"]

    conn = get_connection() 
    cursor = conn.cursor() 
    cursor.execute(
        "DELETE FROM completions WHERE habit_id = ? AND date = ?", 
        (habit_id, date,)
    )
    conn.commit() 
    conn.close() 

    return jsonify({"Deleted_id": habit_id, "Deleted_date": date}), 200 

# GET /calendar

@completions_bp.route("/calendar", methods=["GET"]) 
def calendar_view(): 
    year = int(request.args.get("year")) 
    month = int(request.args.get("month")) 

    if not year or not month: 
        return jsonify({"error": "year and month are required"}), 400 
    
    # YYYY-MM 
    month_str = f"{year:04d}-{month:02d}" 

    conn = get_connection() 
    cursor = conn.cursor() 

    cursor.execute("""
        SELECT date, habit_id
        FROM completions
        WHERE date LIKE ?
        ORDER BY date
    """, (f"{month_str}-%",)) 

    rows = cursor.fetchall() 
    conn.close() 

    calendar = {} 

    for row in rows: 
        date_str = row["date"] 
        habit_id = row["habit_id"] 

        if date_str not in calendar: 
            calendar[date_str] = [] 

        calendar[date_str].append(habit_id) 

    return jsonify(calendar) 

# POST /toggle 

@completions_bp.route("/toggle", methods=["POST"]) 
def toggle_completion(): 
    data = request.json 

    habit_id = data.get("habit_id") 
    date_str = data.get("date") 

    if not habit_id or not date_str: 
        return jsonify({"error": "habit_id and date required"}), 400 
    
    conn = get_connection() 
    cursor = conn.cursor() 

    cursor.execute("SELECT id FROM completions WHERE habit_id = ? AND date = ?",
                   (habit_id, date_str)) 
    
    row = cursor.fetchone() 
    if row: 
        # Completion exists so toggle off 
        cursor.execute("DELETE FROM completions WHERE habit_id = ? AND date = ?",
                       (habit_id, date_str))
        conn.commit() 
        conn.close() 

        return jsonify({
            "habit_id": habit_id, 
            "date": date_str, 
            "completed": False
        }), 200 
    
    else: 
        # completion does not exist so create it 
        cursor.execute(
            "INSERT INTO completions (habit_id, date) VALUES (?, ?)", 
            (habit_id, date_str) 
        )
        conn.commit() 
        conn.close() 

        return jsonify({
            "habit_id": habit_id, 
            "date": date_str, 
            "completed": True 
        }), 201 
    