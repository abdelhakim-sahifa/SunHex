'use client';

import { useState, useEffect } from 'react';

// Import local offline code utilities
import { generateSin } from './sinGenerator';
import { decodeSin } from './sinDecoder';

// --- Start of copied COUNTRY_NAMES from src/app/page.tsx ---
interface Country {
  code: string;
  name: string;
}

const COUNTRY_NAMES: { [key: string]: string } = {
  'AF': 'Afghanistan', 'AL': 'Albania', 'DZ': 'Algeria', 'AD': 'Andorra', 'AO': 'Angola',
  'AG': 'Antigua and Barbuda', 'AR': 'Argentina', 'AM': 'Armenia', 'AU': 'Australia',
  'AT': 'Austria', 'AZ': 'Azerbaijan', 'BS': 'Bahamas', 'BH': 'Bahrain', 'BD': 'Bangladesh',
  'BB': 'Barbados', 'BY': 'Belarus', 'BE': 'Belgium', 'BZ': 'Belize', 'BJ': 'Benin',
  'BT': 'Bhutan', 'BO': 'Bolivia', 'BA': 'Bosnia and Herzegovina', 'BW': 'Botswana',
  'BR': 'Brazil', 'BN': 'Brunei', 'BG': 'Bulgaria', 'BF': 'Burkina Faso', 'BI': 'Burundi',
  'CV': 'Cabo Verde', 'KH': 'Cambodia', 'CM': 'Cameroon', 'CA': 'Canada', 'CF': 'Central African Republic',
  'TD': 'Chad', 'CL': 'Chile', 'CN': 'China', 'CO': 'Colombia', 'KM': 'Comoros',
  'CG': 'Congo', 'CD': 'Congo (Democratic Republic)', 'CR': 'Costa Rica', 'HR': 'Croatia',
  'CU': 'Cuba', 'CY': 'Cyprus', 'CZ': 'Czech Republic', 'DK': 'Denmark', 'DJ': 'Djibouti',
  'DM': 'Dominica', 'DO': 'Dominican Republic', 'EC': 'Ecuador', 'EG': 'Egypt', 'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea', 'ER': 'Eritrea', 'EE': 'Estonia', 'SZ': 'Eswatini', 'ET': 'Ethiopia',
  'FJ': 'Fiji', 'FI': 'Finland', 'FR': 'France', 'GA': 'Gabon', 'GM': 'Gambia',
  'GE': 'Georgia', 'DE': 'Germany', 'GH': 'Ghana', 'GR': 'Greece', 'GD': 'Grenada',
  'GT': 'Guatemala', 'GN': 'Guinea', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HT': 'Haiti',
  'HN': 'Honduras', 'HU': 'Hungary', 'IS': 'Iceland', 'IN': 'India', 'ID': 'Indonesia',
  'IR': 'Iran', 'IQ': 'Iraq', 'IE': 'Ireland', 'IL': 'Israel', 'IT': 'Italy',
  'JM': 'Jamaica', 'JP': 'Japan', 'JO': 'Jordan', 'KZ': 'Kazakhstan', 'KE': 'Kenya',
  'KI': 'Kiribati', 'KP': 'North Korea', 'KR': 'South Korea', 'KW': 'Kuwait', 'KG': 'Kyrgyzstan',
  'LA': 'Laos', 'LV': 'Latvia', 'LB': 'Lebanon', 'LS': 'Lesotho', 'LR': 'Liberia',
  'LY': 'Libya', 'LI': 'Liechtenstein', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'MG': 'Madagascar',
  'MW': 'Malawi', 'MY': 'Malaysia', 'MV': 'Maldives', 'ML': 'Mali', 'MT': 'Malta',
  'MH': 'Marshall Islands', 'MR': 'Mauritania', 'MU': 'Mauritius', 'MX': 'Mexico',
  'FM': 'Micronesia', 'MD': 'Moldova', 'MC': 'Monaco', 'MN': 'Mongolia', 'ME': 'Montenegro',
  'MA': 'Morocco', 'MZ': 'Mozambique', 'MM': 'Myanmar', 'NA': 'Namibia', 'NR': 'Nauru',
  'NP': 'Nepal', 'NL': 'Netherlands', 'NZ': 'New Zealand', 'NI': 'Nicaragua', 'NE': 'Niger',
  'NG': 'Nigeria', 'MK': 'North Macedonia', 'NO': 'Norway', 'OM': 'Oman', 'PK': 'Pakistan',
  'PW': 'Palau', 'PS': 'Palestine', 'PA': 'Panama', 'PG': 'Papua New Guinea', 'PY': 'Paraguay',
  'PE': 'Peru', 'PH': 'Philippines', 'PL': 'Poland', 'PT': 'Portugal', 'QA': 'Qatar',
  'RO': 'Romania', 'RU': 'Russia', 'RW': 'Rwanda', 'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia', 'VC': 'Saint Vincent and the Grenadines', 'WS': 'Samoa', 'SM': 'San Marino',
  'ST': 'Sao Tome and Principe', 'SA': 'Saudi Arabia', 'SN': 'Senegal', 'RS': 'Serbia',
  'SC': 'Seychelles', 'SL': 'Sierra Leone', 'SG': 'Singapore', 'SK': 'Slovakia',
  'SI': 'Slovenia', 'SB': 'Solomon Islands', 'SO': 'Somalia', 'ZA': 'South Africa',
  'SS': 'South Sudan', 'ES': 'Spain', 'LK': 'Sri Lanka', 'SD': 'Sudan', 'SR': 'Suriname',
  'SE': 'Sweden', 'CH': 'Switzerland', 'SY': 'Syria', 'TW': 'Taiwan', 'TJ': 'Tajikistan',
  'TZ': 'Tanzania', 'TH': 'Thailand', 'TL': 'Timor-Leste', 'TG': 'Togo', 'TO': 'Tonga',
  'TT': 'Trinidad and Tobago', 'TN': 'Tunisia', 'TR': 'Turkey', 'TM': 'Turkmenistan',
  'TV': 'Tuvalu', 'UG': 'Uganda', 'UA': 'Ukraine', 'AE': 'United Arab Emirates',
  'GB': 'United Kingdom', 'US': 'United States', 'UY': 'Uruguay', 'UZ': 'Uzbekistan',
  'VU': 'Vanuatu', 'VA': 'Vatican City', 'VE': 'Venezuela', 'VN': 'Vietnam',
  'YE': 'Yemen', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
};
// --- End of copied COUNTRY_NAMES from src/app/page.tsx ---

interface FormData {
  firstName: string;
  lastName: string;
  countryCode: string;
  birthYear: string | number;
  birthMonth: string | number;
  birthDay: string | number;
  gender: string;
  pin: string;
}

interface DecodeData {
  hexCode: string;
  pin: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  countryCode: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
}

interface ApiResult {
  status: 'success' | 'error';
  message?: string;
  hexCode?: string;
  personalInfo?: PersonalInfo;
}

export default function SinForm() {
  const [activeTab, setActiveTab] = useState<'generate' | 'decode'>('generate');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    countryCode: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    pin: ''
  });

  const [decodeData, setDecodeData] = useState<DecodeData>({
    hexCode: '',
    pin: ''
  });

  useEffect(() => {
    const countryList = Object.entries(COUNTRY_NAMES)
      .map(([code, name]) => ({
        code,
        name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setCountries(countryList);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = generateSin(
        formData.firstName,
        formData.lastName,
        formData.countryCode,
        parseInt(formData.birthYear as string),
        parseInt(formData.birthMonth as string),
        parseInt(formData.birthDay as string),
        formData.gender,
        parseInt(formData.pin)
      );
      setResult(response);
    } catch (error: any) {
      setResult({
        status: 'error',
        message: error.message || 'Failed to generate SIN code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecode = async () => {
    setIsLoading(true);
    try {
      const response = decodeSin(decodeData.hexCode, parseInt(decodeData.pin));
      setResult(response);
    } catch (error: any) {
      setResult({
        status: 'error',
        message: error.message || 'Failed to decode SIN code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="testing" className="section">
      <div className="section-header">
        <h2 className="section-title">Try It Out (Offline)</h2>
        <p className="section-subtitle">
          Test our SIN generation and decoding locally
        </p>
      </div>
      <div className="testing-container">
        <div className="test-panel">
          <div className="test-tabs">
            <button
              className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
              onClick={() => setActiveTab('generate')}
            >
              Generate SIN
            </button>
            <button
              className={`tab-button ${activeTab === 'decode' ? 'active' : ''}`}
              onClick={() => setActiveTab('decode')}
            >
              Decode SIN
            </button>
          </div>

          {activeTab === 'generate' ? (
            <div className="generate-form animate-fade-in">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="form-input"
                    autoComplete="given-name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="countryCode">Country</label>
                  <select
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={(e) => {
                      setFormData({...formData, countryCode: e.target.value});
                    }}
                    className="form-select"
                  >
                    <option value="">Select Country</option>
                    {countries && countries.length > 0 ? (
                      countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>Loading countries...</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Birth Date</label>
                  <div className="date-inputs">
                    <select
                      value={formData.birthYear}
                      onChange={(e) => setFormData({...formData, birthYear: parseInt(e.target.value)})}
                      className="form-select year"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({...formData, birthMonth: parseInt(e.target.value)})}
                      className="form-select month"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthDay}
                      onChange={(e) => setFormData({...formData, birthDay: parseInt(e.target.value)})}
                      className="form-select day"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pin">PIN (4 digits)</label>
                  <input
                    type="tel"
                    id="pin"
                    maxLength={4}
                    value={formData.pin}
                    onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})}
                    className="form-input pin"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    autoComplete="off"
                  />
                </div>
              </div>
              <button
                className="submit-button"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Generating...' : 'Generate SIN'}</span>
              </button>
            </div>
          ) : (
            <div className="decode-form animate-fade-in">
              <div className="form-group">
                <label htmlFor="hexCode">SIN Code</label>
                <input
                  type="text"
                  id="hexCode"
                  value={decodeData.hexCode}
                  onChange={(e) => setDecodeData({...decodeData, hexCode: e.target.value})}
                  className="form-input"
                  placeholder="Enter your SIN code"
                />
              </div>
              <div className="form-group">
                <label htmlFor="decodePin">PIN</label>
                <input
                  type="password"
                  id="decodePin"
                  maxLength={4}
                  value={decodeData.pin}
                  onChange={(e) => setDecodeData({...decodeData, pin: e.target.value.replace(/\D/g, '')})}
                  className="form-input pin"
                  placeholder="Enter your PIN"
                />
              </div>
              <button
                className="submit-button"
                onClick={handleDecode}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Decoding...' : 'Decode SIN'}</span>
              </button>
            </div>
          )}

          {result && (
            <div className={`result-container ${result ? 'animate-slide-up' : ''}`}>
              <h3 className="result-title">{result.status === 'success' ? 'Success!' : 'Error'}</h3>
              {result.status === 'success' ? (
                activeTab === 'generate' ? (
                  <div className="success-result">
                    <p className="result-label">Your SIN code:</p>
                    <div className="sin-code-container">
                      <code className="sin-code">{result.hexCode}</code>
                      <button
                        className="copy-button"
                        onClick={() => {
                          navigator.clipboard.writeText(result.hexCode || '');
                          alert('SIN code copied to clipboard!');
                        }}
                        aria-label="Copy SIN code"
                      >
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                    <p className="hint">Save this code and your PIN securely!</p>
                  </div>
                ) : (
                  <div className="decoded-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <label className="info-label">Name:</label>
                        <span className="info-value">{result.personalInfo?.firstName} {result.personalInfo?.lastName}</span>
                      </div>
                      <div className="info-item">
                        <label className="info-label">Country:</label>
                        <span className="info-value">{COUNTRY_NAMES[result.personalInfo?.countryCode || ''] || result.personalInfo?.countryCode}</span>
                      </div>
                      <div className="info-item">
                        <label className="info-label">Birth Date:</label>
                        <span className="info-value">{result.personalInfo?.birthYear}/{result.personalInfo?.birthMonth}/{result.personalInfo?.birthDay}</span>
                      </div>
                      <div className="info-item">
                        <label className="info-label">Gender:</label>
                        <span className="info-value">{result.personalInfo?.gender}</span>
                      </div>
                    </div>
                  </div>
                )
              )
              : (
                <p className="error-message">{result.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
