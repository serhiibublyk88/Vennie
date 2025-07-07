class GeocodingError(Exception):
    """Raised when address cannot be geocoded."""
    pass

class ExternalApiError(Exception):
    """Raised when external API fails (e.g. UK Police API)."""
    pass

class ApiException(Exception):
    """Generic API exception for business logic or validation errors."""
    pass
