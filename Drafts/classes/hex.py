# file: utils.py

# Import other modules
import countries
import date
import sinhex.gender as gender
import traits

# Define __all__ to specify what gets imported with *
__all__ = ["countries", "date", "gender", "traits", "to_hex"]

# Example function
def to_hex(number: int) -> str:
    """Convert an integer to uppercase hex string without 0x"""
    return hex(number)[2:].upper()
