from flask import Flask
from flask_cors import CORS 
from backend.routes.habits import habits_bp 
from backend.routes.completions import completions_bp 
from backend.routes.dashboard import dashboard_bp 
from backend.db import init_db 

def create_app(test_config=None): 
    app = Flask(__name__) 

    # Load default config 
    app.config.from_mapping(DATABASE=None,) 

    # Override with test config if provided 
    if test_config is not None: 
        app.config.update(test_config) 

    CORS(app) 

    init_db(app) 

    app.register_blueprint(habits_bp, url_prefix="/api/habits") 
    app.register_blueprint(completions_bp, url_prefix="/api/completions") 
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    return app 

if __name__ == "__main__": 
    app = create_app() 
    app.run(debug=True) 