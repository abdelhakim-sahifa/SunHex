
import requests
import json

BASE_URL = "http://localhost:3000"

def test_endpoint(method, endpoint, data=None):
    try:
        if method.upper() == 'GET':
            response = requests.get(f"{BASE_URL}{endpoint}")
        elif method.upper() == 'POST':
            headers = {'Content-Type': 'application/json'}
            response = requests.post(f"{BASE_URL}{endpoint}", headers=headers, data=json.dumps(data))
        else:
            print(f"Unsupported method: {method}")
            return

        print(f"Testing {method.upper()} {endpoint}...")
        print(f"Status Code: {response.status_code}")
        try:
            print(f"Response JSON: {response.json()}")
        except json.JSONDecodeError:
            print(f"Response Text: {response.text}")
        print("-"*20)

    except requests.exceptions.RequestException as e:
        print(f"Error testing {method.upper()} {endpoint}: {e}")
        print("-"*20)

if __name__ == "__main__":
    # Test GET endpoints
    test_endpoint('GET', '/')
    test_endpoint('GET', '/health')
    test_endpoint('GET', '/api/countries')

    # Test POST /api/generate
    generate_data = {
        "firstName": "John",
        "lastName": "Doe",
        "countryCode": "US",
        "birthYear": "1990",
        "birthMonth": "01",
        "birthDay": "01",
        "gender": "male",
        "pin": 1234
    }
    test_endpoint('POST', '/api/generate', data=generate_data)

    # Test POST /api/decode (with a dummy hex code)
    # You will need to replace 'dummy_hex_code' with a valid hex code from the /api/generate response
    decode_data = {
        "hexCode": "D50BBB1A7D3C46A10C77BF800C0071B0D214F898318FAE773BFD7067C",
        "pin": 1234
    }
    test_endpoint('POST', '/api/decode', data=decode_data)
