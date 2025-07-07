from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS


def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)  

    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app
