'use client';

import Image from "next/image";
import ThemeToggle from '@/components/ThemeToggle';
import ClientBackgroundAnimation from '@/components/ClientBackgroundAnimation';
import { ApiStatus } from '@/components/ApiStatus';
import { useState, useEffect } from 'react';

interface Country {
  code: string;
  name: string;
}

// Map of country codes to names
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

import './responsive.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'decode'>('generate');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>(() => 
    Object.entries(COUNTRY_NAMES)
      .map(([code, name]) => ({
        code,
        name
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  );
  
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

  // Initialize countries list when component mounts
  useEffect(() => {
    // Convert country codes to array of objects with code and name
    const countryList = Object.entries(COUNTRY_NAMES)
      .map(([code, name]) => ({
        code,
        name
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log('Setting countries:', countryList); // Debug log
    setCountries(countryList);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to generate SIN code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(decodeData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to decode SIN code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ApiStatus />
      
      <div className="bg-animation">
        <ClientBackgroundAnimation />
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Image src="/favicon.png" alt="SunHex Logo" width={32} height={32} />
            <span><i>SunHex</i></span>
          </div>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <ul className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
            <li><a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
            <li><a href="#docs" onClick={() => setIsMobileMenuOpen(false)}>Documentation</a></li>
            <li><a href="#testing" onClick={() => setIsMobileMenuOpen(false)}>Try it</a></li>
            <li><a href="#security" onClick={() => setIsMobileMenuOpen(false)}>Security</a></li>
            <li><a href="/auth-example" onClick={() => setIsMobileMenuOpen(false)}>Auth Components</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="logo-container">
            <Image 
              src="/favicon.png" 
              alt="SunHex Logo" 
              width={96} 
              height={96}
              priority 
              className="responsive-image"
            />
            <h1 className="hero-title"><i>SunHex</i></h1>
          </div>
          <h2 className="hero-subtitle">Serverless Universal Number in Heximal</h2>
          <p className="hero-description">
            Sign up and sign in instantly without servers or third-party accounts. All your essential personal data is securely encoded in a single hexadecimal string, unlocked only with your personal PIN. Fast, private, and self-contained identity management.
          </p>
          <div className="cta-buttons">
            <a href="#testing" className="btn btn-primary">Try it now</a>
            <a href="#docs" className="btn btn-secondary">View Documentation</a>
          </div>
        </div>
      </section>

            <main className="container">
        <section id="features" className="section">
          <div className="section-header">
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">
              Discover what makes our API stand out from the rest
            </p>
          </div>
          <div className="features-grid">
            {[
              {
                icon: 'key',
                title: 'PIN-Based Encryption',
                description: 'Advanced mathematical encryption using PIN multipliers and offset algorithms for maximum security.'
              },
              {
                icon: 'globe',
                title: 'Global Support',
                description: 'Supports 195+ ISO country codes for worldwide deployment and international compatibility.'
              },
              {
                icon: 'compress-alt',
                title: 'Compact Format',
                description: 'Converts complex personal data into efficient hexadecimal strings for optimized storage.'
              },
              {
                icon: 'sync-alt',
                title: 'Bidirectional Processing',
                description: 'Complete reversible encoding/decoding system with full data integrity verification.'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <i className={`fas fa-${feature.icon} feature-icon`}></i>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="docs" className="section">
          <div className="section-header">
            <h2 className="section-title">API Documentation</h2>
            <p className="section-subtitle">
              Explore our comprehensive API endpoints
            </p>
          </div>
          <div className="api-docs">
            <div className="endpoint-card">
              <h3 className="endpoint-title"><code>GET /api/health</code></h3>
              <p className="endpoint-description">Check API health status</p>
            </div>
            <div className="endpoint-card">
              <h3 className="endpoint-title"><code>GET /api/countries</code></h3>
              <p className="endpoint-description">Retrieve list of supported countries</p>
            </div>
            <div className="endpoint-card">
              <h3 className="endpoint-title"><code>POST /api/generate</code></h3>
              <p className="endpoint-description">Generate a new SIN code from personal information</p>
            </div>
            <div className="endpoint-card">
              <h3 className="endpoint-title"><code>POST /api/decode</code></h3>
              <p className="endpoint-description">Decode a SIN code back to personal information</p>
            </div>
          </div>
        </section>

        <section id="testing" className="section">
          <div className="section-header">
            <h2 className="section-title">Try It Out</h2>
            <p className="section-subtitle">
              Test our API with this interactive demo
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
                          console.log('Selected country:', e.target.value); // Debug log
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
                            <span className="info-value">{result.personalInfo?.birthMonth}/{result.personalInfo?.birthDay}/{result.personalInfo?.birthYear}</span>
                          </div>
                          <div className="info-item">
                            <label className="info-label">Gender:</label>
                            <span className="info-value">{result.personalInfo?.gender === 'M' ? 'Male' : 'Female'}</span>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <p className="error-message">{result.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="security" className="section">
          <div className="section-header">
            <h2 className="section-title">Security First</h2>
            <p className="section-subtitle">
              Understanding our security measures
            </p>
          </div>
          <div className="security-content">
            <div className="security-feature">
              <i className="fas fa-lock feature-icon"></i>
              <h3>PIN Protection</h3>
              <p>Personal data is encrypted using a unique PIN, ensuring only authorized access to sensitive information.</p>
            </div>
            <div className="security-feature">
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3>No Data Storage</h3>
              <p>We don&apos;t store any personal information. All data is processed in memory and immediately discarded.</p>
            </div>
            <div className="security-feature">
              <i className="fas fa-fingerprint feature-icon"></i>
              <h3>Data Integrity</h3>
              <p>Built-in verification system ensures data remains intact during encoding and decoding processes.</p>
            </div>
          </div>
        </section>
      </main>
      

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="copyright">© {new Date().getFullYear()} SunHex API. All rights reserved.</p>
            <p className="disclaimer">This is a demonstration project. We do not store any personal data.</p>
          </div>
          <div className="footer-author">
            <p className="author">Developed by <a href="https://github.com/abdelhakim-sahifa" target="_blank" rel="noopener noreferrer">Abdelhakim Sahifa</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}

