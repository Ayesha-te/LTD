import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, Shield, Clock, Users, CheckCircle, Wrench, Battery, Zap, Settings, Award, MapPin, Phone
} from 'lucide-react';

import brake from '../assets/brake.jpg';
import MOT from '../assets/regular_services.jpg';
import vehicleRepairs from '../assets/vehicle_repairs.jpg';
import regularServices from '../assets/regular_services.jpg';
import batteryImg from '../assets/battery.jpg';
import clutch from '../assets/clutch.jpg';
import why from '../assets/why.jpg';
import why2 from '../assets/why2.jpg';
import why3 from '../assets/why3.jpg';

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = [why, why2, why3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: <Shield className="w-12 h-12" />, title: "MOT Testing", description: "Official MOT testing for Class 4, 5 & 7 vehicles", image: MOT },
    { icon: <Wrench className="w-12 h-12" />, title: "Vehicle Repairs", description: "Repairs for all makes and models", image: vehicleRepairs },
    { icon: <Settings className="w-12 h-12" />, title: "Regular Servicing", description: "Routine maintenance for long-lasting performance", image: regularServices },
    { icon: <Car className="w-12 h-12" />, title: "Brake Services", description: "Brake inspection and replacement", image: brake },
    { icon: <Battery className="w-12 h-12" />, title: "Battery Services", description: "Battery testing and replacement", image: batteryImg },
    { icon: <Zap className="w-12 h-12" />, title: "Clutch Repairs", description: "Clutch repair and replacement", image: clutch }
  ];

  const features = [
    { icon: <Award className="w-8 h-8" />, title: "MOT Approved", description: "Official MOT testing station" },
    { icon: <Users className="w-8 h-8" />, title: "Expert Technicians", description: "Qualified and experienced staff" },
    { icon: <Clock className="w-8 h-8" />, title: "Quick Service", description: "Fast turnaround times" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Quality Guaranteed", description: "All work comes with warranty" }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-main)' }}>
      {/* ✅ Enhanced Hero Section */}
      <section className="relative pt-12 pb-24 px-4 md:px-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20" 
               style={{ background: 'var(--primary-blue-light)', filter: 'blur(80px)' }}></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20" 
               style={{ background: 'var(--primary-blue-dark)', filter: 'blur(60px)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="glass-effect rounded-2xl shadow-lg" 
               style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Hero Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-4 py-1 mb-4 rounded-full text-sm font-medium" 
                     style={{ background: 'var(--primary-blue-light)', color: 'white' }}>
                  Trusted Since 2010
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
                  Expert Auto <span className="gradient-text">Services</span> You Can Trust
                </h1>
                <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                  From MOT testing to comprehensive repairs, we keep your vehicle running at its best with professional care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/booking" 
                        className="hover-scale px-8 py-4 rounded-xl text-lg font-semibold text-center" 
                        style={{ 
                          background: 'var(--bg-gradient-card)', 
                          color: 'white',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-md)',
                          transition: 'var(--transition-normal)'
                        }}>
                    Book Now
                  </Link>
                  <Link to="/services" 
                        className="px-8 py-4 rounded-xl text-lg font-semibold border text-center hover" 
                    style={{
                      borderColor: 'var(--primary-blue)',
                      color: 'var(--primary-blue)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'background 0.2s, color 0.2s, var(--transition-normal)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--primary-blue)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '';
                      e.currentTarget.style.color = 'var(--primary-blue)';
                    }}>
                    View Services
                  </Link>
                </div>
                
                {/* Quick Info */}
                <div className="mt-10 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: 'var(--primary-blue)' }}/>
                    <span style={{ color: 'var(--text-muted)' }}>Birmingham, UK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} style={{ color: 'var(--primary-blue)' }}/>
                    <span style={{ color: 'var(--text-muted)' }}>07123 456789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: 'var(--primary-blue)' }}/>
                    <span style={{ color: 'var(--text-muted)' }}>Mon-Sat: 8AM-6PM</span>
                  </div>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 z-0" 
                     style={{ 
                       backgroundImage: `url(${MOT})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       borderRadius: '0 var(--radius-xl) var(--radius-xl) 0',
                       filter: 'brightness(0.9)'
                     }}>
                </div>
                <div className="absolute inset-0" 
                     style={{ 
                       background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                       borderRadius: '0 var(--radius-xl) var(--radius-xl) 0'
                     }}>
                </div>
                <div className="absolute bottom-8 right-8 p-6 glass-effect rounded-xl max-w-xs" 
                     style={{ 
                       boxShadow: 'var(--shadow-md)', 
                       borderRadius: 'var(--radius-md)',
                       border: '1px solid var(--card-border)'
                     }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>4.9</div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: '#fbbf24' }}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>Based on 200+ customer reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Services Section */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-light)' }}>Our Services</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
              We offer comprehensive automotive services with professional expertise and quality assurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="hover-scale glass-effect rounded-xl overflow-hidden" 
                   style={{ 
                     boxShadow: 'var(--shadow-md)', 
                     borderRadius: 'var(--radius-lg)',
                     border: '1px solid var(--card-border)'
                   }}>
                <div className="relative">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0" style={{ 
                    background: 'linear-gradient(to top, rgba(30, 64, 175, 0.4), transparent)' 
                  }}></div>
                </div>
                <div className="p-8">
                  <div style={{ color: 'var(--primary-blue)' }} className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>{service.title}</h3>
                  <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{service.description}</p>
                  <Link to="/booking" className="inline-block px-6 py-3 rounded-lg text-white" 
                        style={{ 
                          background: 'var(--bg-gradient-card)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'var(--transition-normal)'
                        }}>
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Us Section with Slider */}
      <section style={{ 
        padding: 'var(--spacing-2xl) 0',
        background: 'var(--bg-gradient-secondary)'
      }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Why Choose Access Auto Services?</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              We are an MOT approved garage committed to reliable auto care and customer satisfaction.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image slider */}
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img 
                  src={images[currentImg]} 
                  alt="Why choose us" 
                  className="w-full"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                />
                <div className="absolute inset-0" style={{ 
                  background: 'linear-gradient(to top right, rgba(30, 64, 175, 0.3), transparent)' 
                }}></div>
              </div>
            </div>
            {/* Features */}
            <div className="md:w-1/2 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 hover-scale glass-effect" 
                     style={{ 
                       borderRadius: 'var(--radius-md)', 
                       boxShadow: 'var(--shadow-sm)',
                       border: '1px solid var(--card-border)'
                     }}>
                  <div style={{ 
                    color: 'var(--primary-blue)',
                    background: 'rgba(219, 234, 254, 0.5)',
                    padding: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius-sm)'
                  }}>{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg" style={{ color: 'var(--text-dark)' }}>{feature.title}</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                  </div>
                </div>
              ))}
              <div className="text-center mt-10">
                <Link to="/about" className="inline-block px-10 py-4 rounded-xl hover-scale font-semibold" 
                      style={{ 
                        background: 'var(--bg-gradient-card)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'var(--transition-normal)'
                      }}>
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;