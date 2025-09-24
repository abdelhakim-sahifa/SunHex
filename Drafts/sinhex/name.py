from dataclasses import dataclass
from typing import Dict, List

# Maximum name length constant
MAX_NAME_LENGTH: int = 26


class LetterMapper:
    """
    A utility class to map letters to numbers and vice versa.
    Provides bidirectional conversion between characters and two-digit codes.
    """

    letter_to_number: Dict[str, str] = {
        "-": "00",
        "A": "01",
        "B": "02",
        "C": "03",
        "D": "04",
        "E": "05",
        "F": "06",
        "G": "07",
        "H": "08",
        "I": "09",
        "J": "10",
        "K": "11",
        "L": "12",
        "M": "13",
        "N": "14",
        "O": "15",
        "P": "16",
        "Q": "17",
        "R": "18",
        "S": "19",
        "T": "20",
        "U": "21",
        "V": "22",
        "W": "23",
        "X": "24",
        "Y": "25",
        "Z": "26",
    }

    number_to_letter: Dict[str, str] = {v: k for k, v in letter_to_number.items()}

    @classmethod
    def string_to_number(cls, text: str) -> str:
        """
        Convert a string into a number-encoded form using the mapping.
        Raises ValueError if an invalid character is found.
        """
        numbers: List[str] = []
        for ch in text.upper():
            if ch in cls.letter_to_number:
                numbers.append(cls.letter_to_number[ch])
            else:
                raise ValueError(f"Invalid character: {ch}")
        return "".join(numbers)

    @classmethod
    def number_to_string(cls, number: str) -> str:
        """
        Convert a number string back to text using the mapping.
        Returns '?' for unknown chunks.
        """
        chunks: List[str] = [number[i:i + 2] for i in range(0, len(number), 2)]
        letters: List[str] = []
        for chunk in chunks:
            letter: str = cls.number_to_letter.get(chunk, "?")
            letters.append(letter)
        return "".join(letters).lower().capitalize()


def trim_name(name: str) -> str:
    """
    Trim whitespace and extract the first word from a name.
    Returns the word in lowercase.
    """
    try:
        name_lowercase: str = name.strip().lower()
        first_word: str = name_lowercase.split()[0]
        return first_word
    except Exception as e:
        return "err: " + str(e)


def encode(name: str) -> str:
    """
    Encode a name string into its numeric form (up to 26 characters).
    Pads with '00' if shorter, or returns a special overflow code if too long.
    """
    trimmed: str = trim_name(name)
    result: str = LetterMapper.string_to_number(trimmed)

    if len(result) > 26:
        # overflow indicator
        return "15220518061215230000000000"

    while len(result) < 26:
        result += "00"

    return result


def decode(number_string: str) -> str:
    """
    Decode a numeric string back to text representation.
    """
    return LetterMapper.number_to_string(number_string)


def split_full_encoded_name(full_encoded_name: str) -> List[str]:
    """
    Split the encoded full name into parts:
    - Control digit (1 char)
    - First name (26 chars)
    - Last name (26 chars)
    """
    lengths = [1, 26, 26]
    parts: List[str] = []
    start = 0
    for length in lengths:
        parts.append(full_encoded_name[start:start + length])
        start += length
    return parts


@dataclass
class FullName:
    """
    Represents a decoded full name.
    Stores first and last name strings.
    """
    first_name: str
    last_name: str


def decode_full_name(full_encoded_name: str) -> FullName | str:
    """
    Decode the full encoded name into a FullName object.
    Returns an error string if the encoding is invalid.
    """
    parts: List[str] = split_full_encoded_name(full_encoded_name)
    if parts[0] == "1":
        first_name_encoded = parts[1]
        last_name_encoded = parts[2]

        first_name_decoded: str = decode(first_name_encoded).replace("-", "")
        last_name_decoded: str = decode(last_name_encoded).replace("-", "")

        return FullName(first_name=first_name_decoded, last_name=last_name_decoded)
    else:
        return "incorrect encoded full_name"


if __name__ == "__main__":
    normal_first_name: str = input("entre your first name -> ")
    normal_last_name : str = input("entre your last name -> ")

    encoded_first_name: str = encode(normal_first_name)
    encoded_last_name: str = encode(normal_last_name)
    full_encoded_name: str = "1" + encoded_first_name + encoded_last_name

    print("Encoded first name:", encoded_first_name)
    print("Encoded last name:", encoded_last_name)
    print("Full encoded name:", full_encoded_name)

    decoded_full_name = decode_full_name(full_encoded_name)

    if isinstance(decoded_full_name, FullName):
        print("Decoded first name:", decoded_full_name.first_name)
        print("Decoded last name:", decoded_full_name.last_name)
    else:
        print(decoded_full_name)
