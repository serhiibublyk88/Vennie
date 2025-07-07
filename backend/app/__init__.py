import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS


def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    
    app.config["GOOGLE_MAPS_API_KEY"] = os.getenv("GOOGLE_MAPS_API_KEY")
    app.config["POLICE_API_BASE_URL"] = os.getenv("POLICE_API_BASE_URL", "https://data.police.uk/api")

    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app
