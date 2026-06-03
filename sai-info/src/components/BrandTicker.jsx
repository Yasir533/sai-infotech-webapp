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
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track">
        {duplicated.map((brand, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 32px',
              flexShrink: 0,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              style={{
                height: '36px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0)',
                opacity: 0.6,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}