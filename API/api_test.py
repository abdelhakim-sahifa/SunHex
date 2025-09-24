import requests

BASE_URL = "http://localhost:3000"

def test_health():
    print("🔍 Checking health...")
    resp = requests.get(f"{BASE_URL}/health")
    print("Status:", resp.status_code)
    print("Response:", resp.text, "\n")

def test_countries():
    print("🌍 Getting countries list...")
    resp = requests.get(f"{BASE_URL}/api/countries")
    print("Status:", resp.status_code)
    print("Response:", resp.json(), "\n")

def test_generate():
    print("🛠️ Generating HEX code...")
    payload = {
        "firstName": "Ahmed",
        "lastName": "Hassan",
        "countryCode": "MA",
        "birthYear": "1995",
        "birthMonth": "3",
        "birthDay": "22",
        "gender": "male",
        "pin": 5678
    }
    resp = requests.post(f"{BASE_URL}/api/generate", json=payload)
    print("Status:", resp.status_code)
    data = resp.json()
    print("Response:", data, "\n")
    return data.get("hexCode")

def test_decode(hex_code: str):
    print("🔓 Decoding HEX code...")
    payload = {
        "hexCode": hex_code,
        "pin": 5678
    }
    resp = requests.post(f"{BASE_URL}/api/decode", json=payload)
    print("Status:", resp.status_code)
    print("Response:", resp.json(), "\n")

def run_tests():
    test_health()
    test_countries()
    hex_code = test_generate()
    if hex_code:
        test_decode(hex_code)
    else:
        print("⚠️ No hexCode returned, skipping decode test.")

if __name__ == "__main__":
    run_tests()
