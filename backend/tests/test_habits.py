from datetime import date, timedelta 

def test_streak_empty(client):
    response = client.get("/api/habits/1/streak")
    assert response.status_code == 200
    assert response.json["streak"] == 0 

def test_streak_with_completions(client): 
    today = date.today()
    yesterday = today - timedelta(days=1) 
    client.post("/api/completions/", json={"habit_id": 1, "date": yesterday.isoformat()}) 
    client.post("/api/completions/", json={"habit_id": 1, "date": today.isoformat()}) # Use today's date 
    response = client.get("/api/habits/1/streak") 
    assert response.status_code == 200 
    assert response.json["streak"] == 2 
