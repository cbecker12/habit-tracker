def test_double_add(client): 
    client.post("api/completions/", json={"habit_id": 1, "date": "2026-01-10"}) 
    response = client.post("api/completions/", json={"habit_id": 1, "date": "2026-01-10"}) 
    assert response.status_code == 409 
    assert response.json["error"] == "completion already exists for habit_id and date" 

def test_toggle(client): 
    HABIT_ID = 1 
    DATE_STR = "2026-01-10"
    client.post("api/completions/toggle", json={"habit_id": HABIT_ID, "date": DATE_STR}) 
    response = client.post("api/completions/toggle", json={"habit_id": HABIT_ID, "date": DATE_STR}) 
    assert response.status_code == 200 
    assert response.json["habit_id"] == HABIT_ID 
    assert response.json["date"] == DATE_STR 
    assert response.json["completed"] == False 