from countries import display_countries , get_country_code , get_country_code_number


def to_hex(number : int) -> str:
    return hex(number)[2:].upper()  


def  get_hex_date_of_birth(YYYY : int , MM : int , DD : int) ->str:
    return f"{to_hex(YYYY)}{to_hex(MM)}{to_hex(DD)}"


def get_hex_country_code_number(country_code : str) -> str :
    country_code_number = get_country_code_number(country_code)
    return to_hex(country_code_number)


def get_hex_gender(gender : str) -> str : 
    """
    M : for male 
    F : for female
    """
    if gender == 'M':
        return '0' 
    elif gender == 'F' :
        return '1'
    else :
        return 'X'
    








def get_hex_blood_type(bloodtype : str) -> str:

    TYPE_TO_NUMBER = {
        "A+": 1,
        "A-": 2,
        "B+": 3,
        "B-": 4,
        "AB+": 5,
        "AB-": 6,
        "O+": 7,
        "O-": 8
    }

    bloodtype_number = TYPE_TO_NUMBER[bloodtype] 
    return to_hex(bloodtype_number)
    


