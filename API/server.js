const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files


const favicon = require('serve-favicon');
const path = require('path');

app.use(favicon(path.join(__dirname, 'public', 'assets', 'icon.png')));

// ============================================================================
// CONSTANTS AND MAPPINGS
// ============================================================================

const MAX_NAME_LENGTH = 26;

const COUNTRY_CODES = {
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
};

const LETTER_TO_NUMBER = {
    "-": "00", "A": "01", "B": "02", "C": "03", "D": "04", "E": "05", "F": "06",
    "G": "07", "H": "08", "I": "09", "J": "10", "K": "11", "L": "12", "M": "13",
    "N": "14", "O": "15", "P": "16", "Q": "17", "R": "18", "S": "19", "T": "20",
    "U": "21", "V": "22", "W": "23", "X": "24", "Y": "25", "Z": "26"
};

const NUMBER_TO_LETTER = Object.fromEntries(
    Object.entries(LETTER_TO_NUMBER).map(([k, v]) => [v, k])
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function toHex(number) {
    return number.toString(16).toUpperCase();
}

function toInt(hexStr) {
    return parseInt(hexStr, 16);
}

// ============================================================================
// NAME ENCODING/DECODING
// ============================================================================

function trimName(name) {
    try {
        return name.trim().toLowerCase().split(' ')[0];
    } catch (e) {
        return "";
    }
}

function encodeName(name) {
    const trimmed = trimName(name);
    let result = "";
    
    for (const char of trimmed.toUpperCase()) {
        if (char in LETTER_TO_NUMBER) {
            result += LETTER_TO_NUMBER[char];
        } else {
            throw new Error(`Invalid character in name: ${char}`);
        }
    }
    
    // Handle overflow
    if (result.length > 26) {
        return "15220518061215230000000000";  // "OVERFLOW" + padding
    }
    
    // Pad with zeros
    return result.padEnd(26, '0');
}

function decodeName(encodedName) {
    const chunks = [];
    for (let i = 0; i < encodedName.length; i += 2) {
        chunks.push(encodedName.substr(i, 2));
    }
    
    const letters = [];
    for (const chunk of chunks) {
        if (chunk === "00") break;  // Stop at padding
        const letter = NUMBER_TO_LETTER[chunk] || "?";
        letters.push(letter);
    }
    
    return letters.join("").replace("-", "").toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());
}

// ============================================================================
// COUNTRY ENCODING/DECODING
// ============================================================================

function encodeCountry(countryCode) {
    const code = countryCode.toUpperCase();
    if (!(code in COUNTRY_CODES)) {
        throw new Error(`Invalid country code: ${countryCode}`);
    }
    return COUNTRY_CODES[code];
}

function decodeCountry(encodedCountry) {
    for (const [code, number] of Object.entries(COUNTRY_CODES)) {
        if (number === encodedCountry) {
            return code;
        }
    }
    return "??";
}

// ============================================================================
// DATE ENCODING/DECODING
// ============================================================================

function encodeDate(year, month, day) {
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
}

function decodeDate(encodedDate) {
    if (encodedDate.length !== 8) {
        return ["????", "??", "??"];
    }
    return [
        encodedDate.substr(0, 4),
        encodedDate.substr(4, 2),
        encodedDate.substr(6, 2)
    ];
}

// ============================================================================
// GENDER ENCODING/DECODING
// ============================================================================

function encodeGender(gender) {
    return ["male", "m", "1"].includes(gender.toLowerCase()) ? "1" : "0";
}

function decodeGender(encodedGender) {
    return encodedGender === "1" ? "Male" : "Female";
}

// ============================================================================
// SIN SECURITY FUNCTIONS
// ============================================================================

function secureSin(sin, pin) {
    const effectivePin = pin + 2025;
    const sinInt = BigInt(sin);
    const effectivePinBig = BigInt(effectivePin);
    const secured = (sinInt * effectivePinBig) + effectivePinBig;
    return secured.toString();
}

function resolveSin(securedSin, pin) {
    const effectivePin = pin + 2025;
    const securedInt = BigInt(securedSin);
    const effectivePinBig = BigInt(effectivePin);
    const original = (securedInt - effectivePinBig) / effectivePinBig;
    return original.toString();
}

// ============================================================================
// MAIN SIN FUNCTIONS
// ============================================================================

function generateSin(firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, pin) {
    try {
        // Encode all components
        const encodedFirst = encodeName(firstName);
        const encodedLast = encodeName(lastName);
        const encodedCountry = encodeCountry(countryCode);
        const encodedDate = encodeDate(birthYear, birthMonth, birthDay);
        const encodedGender = encodeGender(gender);
        
        // Build SIN: verifier(1) + first_name(26) + last_name(26) + country(4) + date(8) + gender(1)
        const sin = "1" + encodedFirst + encodedLast + encodedCountry + encodedDate + encodedGender;
        
        // Secure with PIN FIRST, then convert to HEX
        const securedSin = secureSin(sin, pin);
        const hexCode = toHex(BigInt(securedSin));
        
        return {
            status: "success",
            hexCode: hexCode,
            debugInfo: {
                originalSin: sin,
                securedSin: securedSin,
                components: {
                    firstName: encodedFirst,
                    lastName: encodedLast,
                    country: encodedCountry,
                    date: encodedDate,
                    gender: encodedGender
                }
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
}

function decodeSin(hexCode, pin) {
    try {
        // Convert HEX to secured SIN
        const securedSin = BigInt(`0x${hexCode}`).toString();
        
        // Resolve the secured SIN with PIN
        const originalSin = resolveSin(securedSin, pin);
        
        // Validate format (should be 66 characters)
        if (originalSin.length !== 66) {
            return {
                status: "error",
                message: `Invalid SIN length after decoding: ${originalSin.length} (expected 66)`
            };
        }
        
        // Check verifier
        if (originalSin[0] !== "1") {
            return {
                status: "error",
                message: "Invalid SIN format: incorrect verifier"
            };
        }
        
        // Extract components
        const verifier = originalSin[0];
        const firstNameEncoded = originalSin.substr(1, 26);
        const lastNameEncoded = originalSin.substr(27, 26);
        const countryEncoded = originalSin.substr(53, 4);
        const dateEncoded = originalSin.substr(57, 8);
        const genderEncoded = originalSin.substr(65, 1);
        
        // Decode components
        const firstName = decodeName(firstNameEncoded);
        const lastName = decodeName(lastNameEncoded);
        const countryCode = decodeCountry(countryEncoded);
        const [year, month, day] = decodeDate(dateEncoded);
        const gender = decodeGender(genderEncoded);
        
        return {
            status: "success",
            personalInfo: {
                firstName: firstName,
                lastName: lastName,
                countryCode: countryCode,
                birthYear: year,
                birthMonth: month,
                birthDay: day,
                gender: gender
            },
            debugInfo: {
                hexCode: hexCode,
                securedSin: securedSin,
                originalSin: originalSin,
                rawComponents: {
                    verifier: verifier,
                    firstNameEncoded: firstNameEncoded,
                    lastNameEncoded: lastNameEncoded,
                    countryEncoded: countryEncoded,
                    dateEncoded: dateEncoded,
                    genderEncoded: genderEncoded
                }
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
}

// ============================================================================
// API ROUTES
// ============================================================================

// Serve documentation page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get supported countries
app.get('/api/countries', (req, res) => {
    res.json({
        status: 'success',
        countries: Object.keys(COUNTRY_CODES).sort()
    });
});

// Generate SIN endpoint
app.post('/api/generate', (req, res) => {
    const { firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, pin } = req.body;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'countryCode', 'birthYear', 'birthMonth', 'birthDay', 'gender', 'pin'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }
    
    // Validate PIN is numeric
    if (isNaN(pin)) {
        return res.status(400).json({
            status: 'error',
            message: 'PIN must be a number'
        });
    }
    
    const result = generateSin(firstName, lastName, countryCode, birthYear, birthMonth, birthDay, gender, parseInt(pin));
    
    if (result.status === 'error') {
        res.status(400).json(result);
    } else {
        res.json(result);
    }
});

// Decode SIN endpoint
app.post('/api/decode', (req, res) => {
    const { hexCode, pin } = req.body;
    
    // Validate required fields
    if (!hexCode || !pin) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: hexCode and pin'
        });
    }
    
    // Validate PIN is numeric
    if (isNaN(pin)) {
        return res.status(400).json({
            status: 'error',
            message: 'PIN must be a number'
        });
    }
    
    const result = decodeSin(hexCode, parseInt(pin));
    
    if (result.status === 'error') {
        res.status(400).json(result);
    } else {
        res.json(result);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`SIN API server running on port ${PORT}`);
    console.log(`Documentation available at http://localhost:${PORT}`);
});

module.exports = app;