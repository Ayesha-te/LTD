import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Clock } from 'lucide-react';

import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Access Auto Services" className="w-10 h-10 object-contain" />
              {/* Removed Car icon */}
              <div>
                <h3 className="text-xl font-bold">Access Auto Services</h3>
                <p className="text-gray-400 text-sm">Professional Vehicle Care</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are an MOT approved garage offering comprehensive vehicle services.
              Our mission is to deliver high-quality, reliable auto care with exceptional
              customer service and integrity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/accessautoservices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services#mot" className="text-gray-300 hover:text-white transition">MOT Testing</Link></li>
              <li><Link to="/services#repairs" className="text-gray-300 hover:text-white transition">Vehicle Repairs</Link></li>
              <li><Link to="/services#servicing" className="text-gray-300 hover:text-white transition">Servicing</Link></li>
              <li><Link to="/services#brakes" className="text-gray-300 hover:text-white transition">Brakes</Link></li>
              <li><Link to="/services#batteries" className="text-gray-300 hover:text-white transition">Batteries</Link></li>
              <li><Link to="/services#clutches" className="text-gray-300 hover:text-white transition">Clutches</Link></li>
              <li><Link to="/services#exhaust" className="text-gray-300 hover:text-white transition">Exhaust Systems</Link></li>
              <li><Link to="/services#diagnostics" className="text-gray-300 hover:text-white transition">Diagnostics</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white transition">Book Appointment</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/my-account" className="text-gray-300 hover:text-white transition">My Account</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>9 Chelson St, Longton,</p>
                  <p>Stoke-on-Trent ST3 1PT</p>
                  <p>123 Main Street</p>
                  <p>London, UK</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">01782 405229</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">info@accessautoservices.co.uk</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1" />
                <div className="text-gray-300 text-sm">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Access Auto Services. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition">Cookies Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
