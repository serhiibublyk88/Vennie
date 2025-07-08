from collections import Counter
from typing import Dict

import requests
from app.exceptions import ApiException
from flask import current_app


class PoliceStatsService:
    @staticmethod
    def get_crime_stats(lat: float, lng: float, date: str) -> Dict[str, int]:
        base_url = current_app.config.get("POLICE_API_BASE_URL")
        if not base_url:
            raise ApiException("Police API base URL is not configured.")

        url = f"{base_url}/crimes-street/all-crime"
        params = {
            "lat": lat,
            "lng": lng,
            "date": date
        }

        try:
            response = requests.get(url, params=params, timeout=10)

            
            if response.status_code == 404:
                return {}

            response.raise_for_status()
            crimes = response.json()

            
            if not crimes:
                return {}

            categories = [crime.get("category") for crime in crimes if "category" in crime]
            return dict(Counter(categories))

        except requests.RequestException as e:
            raise ApiException(f"Error while requesting UK Police API: {e}")
