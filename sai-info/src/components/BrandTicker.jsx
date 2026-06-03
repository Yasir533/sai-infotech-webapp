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
        position: 'fixed',
        top: '96px',          /* sits exactly below the fixed navbar */
        left: 0,
        right: 0,
        zIndex: 45,
        backgroundColor: '#0b1120',
        borderTop: '2px solid rgba(52, 95, 154, 0.4)',
        borderBottom: '2px solid rgba(52, 95, 154, 0.4)',
        padding: '14px 0',
        overflow: 'hidden',
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
          animation: brand-ticker 40s linear infinite;
        }
        .brand-ticker-track:hover {
          animation-play-state: paused;
        }
        .brand-logo {
          opacity: 0.85;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .brand-logo:hover {
          opacity: 1;
          transform: scale(1.15);
        }
      `}</style>

      <div className="brand-ticker-track">
        {duplicated.map((brand, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 48px',
              flexShrink: 0,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="brand-logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}