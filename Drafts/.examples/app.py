

from utils import *
"""
Static information number SINHEX 
countryOfbrith - dateofbirth - gender(maleORfemale) - bloodtype(8 unknown) - eyeColoreAtbirth - hairColorAtBirth 
"""



""



def generate_SINHEX( country_of_birth , date_of_birth , gender , blood_type , eye_colore_at_birth , hair_color_at_birth) : 
    return f"{country_of_birth}{date_of_birth}{gender}{blood_type}{eye_colore_at_birth}{hair_color_at_birth}"



result = generate_SINHEX(
    country_of_birth= get_hex_country_code_number('MA') ,
    date_of_birth= get_hex_date_of_birth(2007 , 6 , 6) ,
    gender= get_hex_gender('M') ,
    blood_type= get_hex_blood_type('O+') , 
    eye_colore_at_birth='XX' ,
    hair_color_at_birth='XX'
)

print(result)









