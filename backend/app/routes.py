from flask import Blueprint, jsonify, request

from app.exceptions import ApiException, GeocodingError
from app.services.geocoding_service import GeocodingService
from app.services.police_stats_service import PoliceStatsService

bp = Blueprint("routes", __name__)


@bp.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Welcome to Vennie API"}), 200


@bp.route("/api/crime-stats", methods=["POST"])
def crime_stats():
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Invalid or missing JSON payload."}), 400

        postcode = data.get("postcode")
        date = data.get("date")

        if not postcode or not date:
            return jsonify({"error": "Missing required fields: 'postcode' and/or 'date'"}), 400

        location = GeocodingService.get_coordinates(postcode)

        crimes = PoliceStatsService.get_crime_stats(
            lat=location["latitude"],
            lng=location["longitude"],
            date=date
        )

        return jsonify({
            "postcode": postcode,
            "date": date,
            "crimes": crimes
        }), 200

    except GeocodingError as e:
        return jsonify({"error": str(e)}), 400

    except ApiException as e:
        return jsonify({"error": str(e)}), 502

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
