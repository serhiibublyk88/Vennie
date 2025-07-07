from flask import Blueprint, jsonify

bp = Blueprint("routes", __name__)


@bp.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Welcome to Vennie API"}), 200


@bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200
