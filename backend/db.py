import sqlite3
from flask import current_app

DB_NAME = "habits.db"


def get_connection():
    db_path = current_app.config.get("DATABASE") or DB_NAME
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(app):
    # Ensure get_connection() can access current_app
    with app.app_context():
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS completions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                habit_id INTEGER NOT NULL,
                date TEXT NOT NULL,
                UNIQUE (habit_id, date),
                FOREIGN KEY (habit_id) REFERENCES habits (id)
            )
        """)

        conn.commit()
        conn.close()
