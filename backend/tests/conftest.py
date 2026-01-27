import pytest
import tempfile
import os
from backend.app import create_app
from backend.db import init_db

@pytest.fixture
def client(tmp_path):
    db_path = tmp_path / "test.db" 

    app = create_app({
        "TESTING": True,
        "DATABASE": db_path,
    })

    with app.test_client() as client:
        with app.app_context():
            init_db(app)
        yield client 
