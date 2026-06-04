import saiInfotech from '../assets/brands/logo-icon-sm.png'
import dell from '../assets/brands/dell.png'
import hp from '../assets/brands/hp.png'
import lenovo from '../assets/brands/lenovo.png'
import asus from '../assets/brands/asus.png'
import acer from '../assets/brands/acer.png'
import intel from '../assets/brands/intel.png'
import microsoft from '../assets/brands/microsoft.png'
import samsung from '../assets/brands/samsung.png'
import apple from '../assets/brands/apple.png'
import cisco from '../assets/brands/cisco.png'
import aws from '../assets/brands/aws.png'
import azure from '../assets/brands/azure.png'
import googleCloud from '../assets/brands/google-cloud.png'
import ubiquiti from '../assets/brands/ubiquiti.png'
import ruckus from '../assets/brands/ruckus.png'

const brands = [
  { src: dell, name: 'Dell' },
  { src: hp, name: 'HP' },
  { src: lenovo, name: 'Lenovo' },
  { src: asus, name: 'ASUS' },
  { src: acer, name: 'Acer' },
  { src: intel, name: 'Intel' },
  { src: microsoft, name: 'Microsoft' },
  { src: samsung, name: 'Samsung' },
  { src: apple, name: 'Apple' },
  { src: cisco, name: 'Cisco' },
  { src: aws, name: 'AWS' },
  { src: azure, name: 'Azure' },
  { src: googleCloud, name: 'Google Cloud' },
  { src: ubiquiti, name: 'Ubiquiti' },
  { src: ruckus, name: 'Ruckus' },
]

const duplicated = [...brands, ...brands]

export default function BrandTicker() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '18px 0',
        background: 'rgba(255,255,255,0.85)',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <style>{`
        @keyframes brand-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-ticker-track {
          display: flex;
          width: max-content;
          animation: brand-ticker 30s linear infinite;
        }
        .brand-ticker-track:hover {
          animation-play-state: paused;
        }
        .brand-logo {
          opacity: 0.85;
          transition: opacity 0.3s ease, transform 0.3s ease;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.10));
        }
        .brand-logo:hover {
          opacity: 1;
          transform: scale(1.15);
        }
      `}</style>

      {/* Fixed SAI INFOTECH logo on the left */}
      <div
        style={{
          flexShrink: 0,
          paddingLeft: '24px',
          paddingRight: '28px',
          borderRight: '2px solid #e2e8f0',
          marginRight: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <img
          src={saiInfotech}
          alt="SAI INFOTECH Logo"
          style={{
            height: '48px',
            width: '48px',
            objectFit: 'contain',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#1e40af',
              lineHeight: '1.2',
            }}
          >
            SAI INFOTECH
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#64748b',
              lineHeight: '1.2',
            }}
          >
            TECHNOLOGY SERVICES
          </span>
        </div>
      </div>

      {/* Scrolling brand logos */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="brand-ticker-track">
          {duplicated.map((brand, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 20px',
                flexShrink: 0,
              }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="brand-logo"
                style={{
                  height: '44px',
                  width: '110px',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}