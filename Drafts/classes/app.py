# Import other modules
from countries import Country , Countries
from date import Date , Day , Month , Year
from sinhex.gender import Gender
from traits import blood_types , eye_colors , hair_colors

def to_hex(number : int) -> str:
    return hex(number)[2:].upper()  



def get_SINHEX(country : Country , birthday : Date , gender: Gender , blood_type , eye_colore , hair_color) :
    sin =  f"{country.number}{birthday.year}{birthday.month}{birthday.day}{gender}{blood_type}{eye_colore}{hair_color}"
    return to_hex(int(sin))

sinhex = get_SINHEX(
    country=Countries.Morocco ,
    birthday= Date(Year.Y2007 , Month.June , Day.D06) ,
    gender= Gender.male ,
    blood_type= blood_types['A+'] ,
    hair_color=hair_colors["Brown"] ,
    eye_colore=eye_colors['Brown']
)


print(sinhex)




