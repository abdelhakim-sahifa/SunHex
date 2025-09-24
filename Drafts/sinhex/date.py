def format_date(year: str, month: str, day: str) -> str:
    """
    Format a date into YYYYMMDD.
    
    - Pads month and day with a leading zero if necessary.
    - Example: year="2002", month="2", day="3" → "20020203"
    """
    month_padded: str = month.zfill(2)  # "2" → "02"
    day_padded: str = day.zfill(2)      # "3" → "03"
    return f"{year}{month_padded}{day_padded}"



