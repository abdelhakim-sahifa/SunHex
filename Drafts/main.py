#!/usr/bin/env python3
"""
Complete SIN (Social Insurance Number) Generator and Decoder
Combines all modules into a single program for encoding personal info to SIN and decoding SIN back to info.
"""

from dataclasses import dataclass
from typing import Dict, List, Union
import string

# ============================================================================
# CONSTANTS AND MAPPINGS
# ============================================================================

MAX_NAME_LENGTH = 26

COUNTRY_CODES = {
    'AF': '0106', 'AL': '0112', 'DZ': '0426', 'AD': '0104', 'AO': '0115', 'AG': '0107',
    'AR': '0118', 'AM': '0113', 'AU': '0121', 'AT': '0120', 'AZ': '0126', 'BS': '0219',
    'BH': '0208', 'BD': '0204', 'BB': '0202', 'BY': '0225', 'BE': '0205', 'BZ': '0226',
    'BJ': '0210', 'BT': '0220', 'BO': '0215', 'BA': '0201', 'BW': '0223', 'BR': '0218',
    'BN': '0214', 'BG': '0207', 'BF': '0206', 'BI': '0209', 'CV': '0322', 'KH': '1108',
    'CM': '0313', 'CA': '0301', 'CF': '0306', 'TD': '2004', 'CL': '0312', 'CN': '0314',
    'CO': '0315', 'KM': '1113', 'CG': '0307', 'CD': '0304', 'CR': '0318', 'HR': '0818',
    'CU': '0321', 'CY': '0325', 'CZ': '0326', 'DK': '0411', 'DJ': '0410', 'DM': '0413',
    'DO': '0415', 'EC': '0503', 'EG': '0507', 'SV': '1922', 'GQ': '0717', 'ER': '0518',
    'EE': '0505', 'SZ': '1926', 'ET': '0520', 'FJ': '0610', 'FI': '0609', 'FR': '0618',
    'GA': '0701', 'GM': '0713', 'GE': '0705', 'DE': '0405', 'GH': '0708', 'GR': '0718',
    'GD': '0704', 'GT': '0720', 'GN': '0714', 'GW': '0723', 'GY': '0725', 'HT': '0820',
    'HN': '0814', 'HU': '0821', 'IS': '0919', 'IN': '0914', 'ID': '0904', 'IR': '0918',
    'IQ': '0917', 'IE': '0905', 'IL': '0912', 'IT': '0920', 'JM': '1013', 'JP': '1016',
    'JO': '1015', 'KZ': '1126', 'KE': '1105', 'KI': '1109', 'KW': '1123', 'KG': '1107',
    'LA': '1201', 'LV': '1222', 'LB': '1202', 'LS': '1219', 'LR': '1218', 'LY': '1225',
    'LI': '1209', 'LT': '1220', 'LU': '1221', 'MG': '1307', 'MW': '1323', 'MY': '1325',
    'MV': '1322', 'ML': '1312', 'MT': '1320', 'MH': '1308', 'MR': '1318', 'MU': '1321',
    'MX': '1324', 'FM': '0613', 'MD': '1304', 'MC': '1303', 'MN': '1314', 'ME': '1305',
    'MA': '1301', 'MZ': '1326', 'MM': '1313', 'NA': '1401', 'NR': '1418', 'NP': '1416',
    'NL': '1412', 'NZ': '1426', 'NI': '1409', 'NE': '1405', 'NG': '1407', 'KP': '1116',
    'MK': '1311', 'NO': '1415', 'OM': '1513', 'PK': '1611', 'PW': '1623', 'PS': '1619',
    'PA': '1601', 'PG': '1607', 'PY': '1625', 'PE': '1605', 'PH': '1608', 'PL': '1612',
    'PT': '1620', 'QA': '1701', 'RO': '1815', 'RU': '1821', 'RW': '1823', 'KN': '1114',
    'LC': '1203', 'VC': '2203', 'WS': '2319', 'SM': '1913', 'ST': '1920', 'SA': '1901',
    'SN': '1914', 'RS': '1819', 'SC': '1903', 'SL': '1912', 'SG': '1907', 'SK': '1911',
    'SI': '1909', 'SB': '1902', 'SO': '1915', 'ZA': '2601', 'KR': '1118', 'SS': '1919',
    'ES': '0519', 'LK': '1211', 'SD': '1904', 'SR': '1918', 'SE': '1905', 'CH': '0308',
    'SY': '1925', 'TW': '2023', 'TJ': '2010', 'TZ': '2026', 'TH': '2008', 'TL': '2012',
    'TG': '2007', 'TO': '2015', 'TT': '2020', 'TN': '2014', 'TR': '2018', 'TM': '2013',
    'TV': '2022', 'UG': '2107', 'UA': '2101', 'AE': '0105', 'GB': '0702', 'US': '2119',
    'UY': '2125', 'UZ': '2126', 'VU': '2221', 'VA': '2201', 'VE': '2205', 'VN': '2214',
    'YE': '2505', 'ZM': '2613', 'ZW': '2623'
}

LETTER_TO_NUMBER = {
    "-": "00", "A": "01", "B": "02", "C": "03", "D": "04", "E": "05", "F": "06",
    "G": "07", "H": "08", "I": "09", "J": "10", "K": "11", "L": "12", "M": "13",
    "N": "14", "O": "15", "P": "16", "Q": "17", "R": "18", "S": "19", "T": "20",
    "U": "21", "V": "22", "W": "23", "X": "24", "Y": "25", "Z": "26"
}

NUMBER_TO_LETTER = {v: k for k, v in LETTER_TO_NUMBER.items()}

# ============================================================================
# DATA CLASSES
# ============================================================================

@dataclass
class PersonalInfo:
    """Represents decoded personal information from a SIN."""
    first_name: str
    last_name: str
    country_code: str
    birth_year: str
    birth_month: str
    birth_day: str
    gender: str

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def to_hex(number: int) -> str:
    """Convert an integer to an uppercase hexadecimal string (without 0x)."""
    return hex(number)[2:].upper()

def to_int(hex_str: str) -> int:
    """Convert a hexadecimal string back to an integer."""
    return int(hex_str, 16)

# ============================================================================
# NAME ENCODING/DECODING
# ============================================================================

def trim_name(name: str) -> str:
    """Extract and clean the first word from a name."""
    try:
        return name.strip().lower().split()[0]
    except (IndexError, AttributeError):
        return ""

def encode_name(name: str) -> str:
    """Encode a name string into its numeric form (26 characters)."""
    trimmed = trim_name(name)
    result = ""
    
    for char in trimmed.upper():
        if char in LETTER_TO_NUMBER:
            result += LETTER_TO_NUMBER[char]
        else:
            raise ValueError(f"Invalid character in name: {char}")
    
    # Handle overflow
    if len(result) > 26:
        return "15220518061215230000000000"  # "OVERFLOW" + padding
    
    # Pad with zeros
    return result.ljust(26, '0')

def decode_name(encoded_name: str) -> str:
    """Decode a numeric string back to text."""
    chunks = [encoded_name[i:i+2] for i in range(0, len(encoded_name), 2)]
    letters = []
    
    for chunk in chunks:
        if chunk == "00":
            break  # Stop at padding
        letter = NUMBER_TO_LETTER.get(chunk, "?")
        letters.append(letter)
    
    return "".join(letters).replace("-", "").lower().capitalize()

# ============================================================================
# COUNTRY ENCODING/DECODING
# ============================================================================

def encode_country(country_code: str) -> str:
    """Convert country code to numeric representation."""
    code = country_code.upper()
    if code not in COUNTRY_CODES:
        raise ValueError(f"Invalid country code: {country_code}")
    return COUNTRY_CODES[code]

def decode_country(encoded_country: str) -> str:
    """Convert numeric country code back to ISO code."""
    for code, number in COUNTRY_CODES.items():
        if number == encoded_country:
            return code
    return "??"

# ============================================================================
# DATE ENCODING/DECODING
# ============================================================================

def encode_date(year: str, month: str, day: str) -> str:
    """Format date as YYYYMMDD with zero padding."""
    return f"{year}{month.zfill(2)}{day.zfill(2)}"

def decode_date(encoded_date: str) -> tuple:
    """Decode YYYYMMDD format back to year, month, day."""
    if len(encoded_date) != 8:
        return "????", "??", "??"
    return encoded_date[:4], encoded_date[4:6], encoded_date[6:8]

# ============================================================================
# GENDER ENCODING/DECODING
# ============================================================================

def encode_gender(gender: str) -> str:
    """Encode gender as numeric value."""
    return "1" if gender.lower() in ["male", "m", "1"] else "0"

def decode_gender(encoded_gender: str) -> str:
    """Decode numeric gender back to text."""
    return "Male" if encoded_gender == "1" else "Female"

# ============================================================================
# SIN SECURITY FUNCTIONS
# ============================================================================

def secure_sin(sin: str, pin: int) -> str:
    """
    Secure a SIN by mixing it with a PIN using formula: (sin * effective_pin) + effective_pin
    Automatically adds 2025 to PIN to ensure it's never 0.
    """
    effective_pin = pin + 2025  # Ensure PIN is never 0
    sin_int = int(sin)
    secured = (sin_int * effective_pin) + effective_pin
    return str(secured)

def resolve_sin(secured_sin: str, pin: int) -> str:
    """
    Resolve a secured SIN using the PIN: (secured - effective_pin) // effective_pin
    Automatically adds 2025 to PIN to match the encoding process.
    """
    effective_pin = pin + 2025  # Same offset as during encoding
    secured_int = int(secured_sin)
    original = (secured_int - effective_pin) // effective_pin
    return str(original)

# ============================================================================
# MAIN SIN FUNCTIONS
# ============================================================================

def generate_sin(first_name: str, last_name: str, country_code: str, 
                birth_year: str, birth_month: str, birth_day: str, 
                gender: str, pin: int) -> dict:
    """
    Generate a SIN from personal information.
    Flow: Info → SIN → Secure with PIN → Convert to HEX
    
    Returns:
        dict: Contains HEX code (what user gets) and internal components for debugging
    """
    try:
        # Encode all components
        encoded_first = encode_name(first_name)
        encoded_last = encode_name(last_name)
        encoded_country = encode_country(country_code)
        encoded_date = encode_date(birth_year, birth_month, birth_day)
        encoded_gender = encode_gender(gender)
        
        # Build SIN: verifier(1) + first_name(26) + last_name(26) + country(4) + date(8) + gender(1)
        sin = "1" + encoded_first + encoded_last + encoded_country + encoded_date + encoded_gender
        
        # Secure with PIN FIRST, then convert to HEX
        secured_sin = secure_sin(sin, pin)
        hex_code = to_hex(int(secured_sin))
        
        return {
            "status": "success",
            "hex_code": hex_code,  # This is what the user gets
            "debug_info": {
                "original_sin": sin,
                "secured_sin": secured_sin,
                "components": {
                    "first_name": encoded_first,
                    "last_name": encoded_last,
                    "country": encoded_country,
                    "date": encoded_date,
                    "gender": encoded_gender
                }
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def decode_sin(hex_code: str, pin: int) -> dict:
    """
    Decode a HEX code back to personal information.
    Flow: HEX → Secured SIN → Resolve with PIN → Extract info
    
    Returns:
        dict: Contains decoded personal information or error message
    """
    try:
        # Convert HEX to secured SIN
        secured_sin = str(to_int(hex_code))
        
        # Resolve the secured SIN with PIN
        original_sin = resolve_sin(secured_sin, pin)
        
        # Validate format (should be 66 characters)
        if len(original_sin) != 66:
            return {
                "status": "error",
                "message": f"Invalid SIN length after decoding: {len(original_sin)} (expected 66)"
            }
        
        # Check verifier
        if original_sin[0] != "1":
            return {
                "status": "error",
                "message": "Invalid SIN format: incorrect verifier"
            }
        
        # Extract components
        verifier = original_sin[0]
        first_name_encoded = original_sin[1:27]
        last_name_encoded = original_sin[27:53]
        country_encoded = original_sin[53:57]
        date_encoded = original_sin[57:65]
        gender_encoded = original_sin[65:66]
        
        # Decode components
        first_name = decode_name(first_name_encoded)
        last_name = decode_name(last_name_encoded)
        country_code = decode_country(country_encoded)
        year, month, day = decode_date(date_encoded)
        gender = decode_gender(gender_encoded)
        
        return {
            "status": "success",
            "personal_info": PersonalInfo(
                first_name=first_name,
                last_name=last_name,
                country_code=country_code,
                birth_year=year,
                birth_month=month,
                birth_day=day,
                gender=gender
            ),
            "debug_info": {
                "hex_code": hex_code,
                "secured_sin": secured_sin,
                "original_sin": original_sin,
                "raw_components": {
                    "verifier": verifier,
                    "first_name_encoded": first_name_encoded,
                    "last_name_encoded": last_name_encoded,
                    "country_encoded": country_encoded,
                    "date_encoded": date_encoded,
                    "gender_encoded": gender_encoded
                }
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# ============================================================================
# MAIN PROGRAM INTERFACE
# ============================================================================

def print_separator():
    print("=" * 60)

def print_menu():
    print("\n" + "="*60)
    print("           SIN GENERATOR/DECODER")
    print("="*60)
    print("1. Generate SIN from personal information")
    print("2. Decode SIN to personal information")
    print("3. Exit")
    print("="*60)

def get_personal_info():
    """Get personal information from user input."""
    print("\nEnter Personal Information:")
    print("-" * 30)
    
    first_name = input("First Name: ").strip()
    last_name = input("Last Name: ").strip()
    country_code = input("Country Code (e.g., MA, US, CA): ").strip().upper()
    birth_year = input("Birth Year (YYYY): ").strip()
    birth_month = input("Birth Month (MM): ").strip()
    birth_day = input("Birth Day (DD): ").strip()
    gender = input("Gender (Male/Female): ").strip()
    
    while True:
        try:
            pin = int(input("PIN Code (numeric): ").strip())
            break
        except ValueError:
            print("Please enter a valid numeric PIN.")
    
    return first_name, last_name, country_code, birth_year, birth_month, birth_day, gender, pin

def main():
    """Main program loop."""
    print("Welcome to the SIN Generator/Decoder!")
    
    while True:
        print_menu()
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == "1":
            # Generate SIN
            print_separator()
            first_name, last_name, country_code, birth_year, birth_month, birth_day, gender, pin = get_personal_info()
            
            result = generate_sin(first_name, last_name, country_code, birth_year, birth_month, birth_day, gender, pin)
            
            print_separator()
            if result["status"] == "success":
                print("SIN GENERATION SUCCESSFUL!")
                print("-" * 30)
                print(f"YOUR HEX CODE: {result['hex_code']}")
                print("\n⚠️  IMPORTANT: Save this HEX code! You'll need it to decode your information.")
                print("    The HEX code contains your secured and encoded personal data.")
                
                # Debug info (optional - you can remove this in production)
                print(f"\n[DEBUG] Original SIN: {result['debug_info']['original_sin']}")
                print(f"[DEBUG] Secured SIN:  {result['debug_info']['secured_sin']}")
            else:
                print(f"ERROR: {result['message']}")
        
        elif choice == "2":
            # Decode SIN
            print_separator()
            hex_code = input("Enter HEX Code: ").strip().upper()
            
            while True:
                try:
                    pin = int(input("Enter PIN Code: ").strip())
                    break
                except ValueError:
                    print("Please enter a valid numeric PIN.")
            
            result = decode_sin(hex_code, pin)
            
            print_separator()
            if result["status"] == "success":
                info = result["personal_info"]
                print("HEX CODE DECODING SUCCESSFUL!")
                print("-" * 30)
                print(f"First Name:    {info.first_name}")
                print(f"Last Name:     {info.last_name}")
                print(f"Country Code:  {info.country_code}")
                print(f"Birth Date:    {info.birth_day}/{info.birth_month}/{info.birth_year}")
                print(f"Gender:        {info.gender}")
                
                # Debug info (optional - you can remove this in production)
                debug = result["debug_info"]
                print(f"\n[DEBUG] HEX Code:     {debug['hex_code']}")
                print(f"[DEBUG] Secured SIN:  {debug['secured_sin']}")
                print(f"[DEBUG] Original SIN: {debug['original_sin']}")
            else:
                print(f"ERROR: {result['message']}")
        
        elif choice == "3":
            print("\nThank you for using SIN Generator/Decoder!")
            break
        
        else:
            print("\nInvalid choice. Please enter 1, 2, or 3.")
        
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()