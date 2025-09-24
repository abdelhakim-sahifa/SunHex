import countries
import date
import gender
import name


def to_hex(number: int) -> str:
    """Convert an integer to an uppercase hexadecimal string (without 0x)."""
    return hex(number)[2:].upper()


def to_int(hex_str: str) -> int:
    """Convert a hexadecimal string (without 0x) back to an integer."""
    return int(hex_str, 16)


# Personal information
first_name = "abdelhakim"
last_name = "sahifa"

country_code = "MA"
birth_year = "2007"
birth_month = "06"
birth_day = "06"

gender_value = "male"
pin_code = 1142

# Construct components
# verifier:1 + firstname:26 + lastname:26
encoded_full_name = (
    "1" + name.encode(first_name) + name.encode(last_name)
)  # 10102040512080111091300000019010809060100000000000000
encoded_country = countries.country_code_to_number(country_code)  # 1301
encoded_birthday = date.format_date(birth_year, birth_month, birth_day)  # 20070606
encoded_gender = gender.male  # 0


def secure_sin(sin: str, pin: int) -> str:
    """
    Secure a SIN by mixing it with a PIN.
    Formula: (sin_as_int * pin) + pin
    """
    sin_int = int(sin)
    secured = (sin_int * pin) + pin
    return str(secured)


def resolve_sin(secured_sin: str, pin: int) -> str:
    """
    Resolve a secured SIN using the same PIN.
    Reverse of secure_sin:
    Formula: (secured - pin) // pin
    """
    secured_int = int(secured_sin)
    original = (secured_int - pin) // pin  # integer division to avoid decimals
    return str(original)


# Build final SIN
# name(53) + country(4) + birthday(8) + gender(1)
sin = encoded_full_name + encoded_country + encoded_birthday + encoded_gender
# Example: 101020405120801110913000000190108090601000000000000001301200706060

sin_hex = to_hex(int(sin))
back_to_sin = to_int(sin_hex)

secured_sin = secure_sin(sin, pin_code)
resolved_sin = resolve_sin(secured_sin, pin_code)


if __name__ == '__main__' : 
    # Debug output
    print("Original SIN: ", sin)
    print("Hexadecimal SIN: ", sin_hex)
    print("Back from Hex: ", back_to_sin)
    print("Secured SIN: ", secured_sin)
    print("Resolved SIN: ", resolved_sin)
