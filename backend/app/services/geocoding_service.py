import re
import googlemaps
from flask import current_app
from app.exceptions import GeocodingError

UK_POSTCODE_REGEX = re.compile(
    r"^(GIR ?0AA|(?:[A-PR-UWYZ][0-9]{1,2}|[A-PR-UWYZ][A-HK-Y][0-9]{1,2}"
    r"|[A-PR-UWYZ][0-9][A-HJKSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]) ?[0-9][ABD-HJLNP-UW-Z]{2})$",
    re.IGNORECASE
)

class GeocodingService:
    @staticmethod
    def get_coordinates(postcode: str) -> dict:
        if not UK_POSTCODE_REGEX.match(postcode):
            raise GeocodingError("Invalid UK postcode format.")

        try:
            api_key = current_app.config.get("GOOGLE_MAPS_API_KEY")
            if not api_key:
                raise GeocodingError("Google Maps API key is missing in configuration.")

            gmaps = googlemaps.Client(key=api_key)
            result = gmaps.geocode(postcode)

            if not result or "geometry" not in result[0]:
                raise GeocodingError("No results found for the given postcode.")

            location = result[0]["geometry"]["location"]
            return {"latitude": location["lat"], "longitude": location["lng"]}

        except GeocodingError:
            raise
        except Exception as e:
            raise GeocodingError(f"Unexpected error during geocoding: {e}")
