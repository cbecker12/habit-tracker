import json
from datetime import date

def test_dashboard_empty(client):
    """
    No habits in the system → dashboard should return empty habits list
    """
    resp = client.get("/api/dashboard/")
    assert resp.status_code == 200

    data = resp.get_json()
    assert "date" in data
    assert data["habits"] == []


def test_dashboard_with_habit_no_completion(client):
    """
    One habit, not completed today
    """
    # Create habit
    resp = client.post(
        "/api/habits/",
        json={"name": "Read"}
    )
    assert resp.status_code == 201

    # Fetch dashboard
    resp = client.get("/api/dashboard/")
    assert resp.status_code == 200

    data = resp.get_json()
    habits = data["habits"]

    assert len(habits) == 1
    habit = habits[0]

    assert habit["name"] == "Read"
    assert habit["completed_today"] is False
    assert habit["streak"] == 0


def test_dashboard_completed_today(client):
    """
    Habit completed today should show completed_today=True and streak=1
    """
    today = date.today().isoformat()

    # Create habit
    habit_resp = client.post(
        "/api/habits/",
        json={"name": "Exercise"}
    )
    habit_id = habit_resp.get_json()["id"]

    # Complete habit today
    comp_resp = client.post(
        "/api/completions/",
        json={
            "habit_id": habit_id,
            "date": today
        }
    )
    assert comp_resp.status_code == 201

    # Fetch dashboard
    resp = client.get("/api/dashboard/")
    data = resp.get_json()

    habit = data["habits"][0]
    assert habit["completed_today"] is True
    assert habit["streak"] == 1


def test_dashboard_multiple_habits(client):
    """
    Multiple habits with mixed completion states
    """
    today = date.today().isoformat()

    h1 = client.post("/api/habits/", json={"name": "Read"}).get_json()["id"]
    h2 = client.post("/api/habits/", json={"name": "Meditate"}).get_json()["id"]

    client.post("/api/completions/", json={
        "habit_id": h1,
        "date": today
    })

    resp = client.get("/api/dashboard/")
    habits = resp.get_json()["habits"]

    assert len(habits) == 2

    read = next(h for h in habits if h["name"] == "Read")
    meditate = next(h for h in habits if h["name"] == "Meditate")

    assert read["completed_today"] is True
    assert meditate["completed_today"] is False
