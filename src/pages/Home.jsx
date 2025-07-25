import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car, Shield, Clock, Users, CheckCircle, Wrench, Battery, Zap, Settings, Award, MapPin, Phone, Search, ChevronDown, ShoppingCart, X as XIcon
} from 'lucide-react';

import brake from '../assets/brake.jpg';
import hero from "../assets/MOT.jpg"
import MOT from '../assets/bg1.jpg';
import vehicleRepairs from '../assets/vehicle_repairs.jpg';
import regularServices from '../assets/regular_services.jpg';
import batteryImg from '../assets/battery.jpg';
import clutch from '../assets/clutch.jpg';
import why from '../assets/why.jpg';
import why2 from '../assets/why2.jpg';
import why3 from '../assets/why3.jpg';

const allCategories = [
  {
    id: 'mot', label: 'MOT', services: [
      { id: 'mot', name: 'MOT', price: 45 },
      { id: 'mot_iv', name: 'MOT IV', price: 45 },
      { id: 'mot_vii', name: 'MOT VII', price: 50 }
    ]
  },
  {
    id: 'servicing', label: 'Servicing', services: [
      { id: 'interim', name: 'Interim Service (Oil Service)', price: 108 },
      { id: 'engine', name: 'Engine Service (mid service)', price: 167.87 },
      { id: 'full', name: 'Full Service (major)', price: 226.79 }
    ]
  },
  {
    id: 'brakes', label: 'Brakes', services: [
      { id: 'front_brake_pads', name: 'Front Brake Pads', price: null },
      { id: 'front_brake_disc_pads', name: 'Front Brake Disc and Pads Replacement', price: 252 },
      { id: 'rear_brake_disc_pads', name: 'Rear Brake Disc and Pads Replacement', price: 228 },
      { id: 'rear_brake_pads', name: 'Rear Brake Pads', price: null },
      { id: 'brake_fluid_change', name: 'Brake fluid change (non diagnostics)', price: 72 },
      { id: 'brake_repair_birmingham', name: 'Brake Repair Birmingham', price: 132 }
    ]
  },
  {
    id: 'steering', label: 'Steering', services: [
      { id: 'front_2wheel_alignment', name: 'Front 2 wheel Alignment', price: 72 },
      { id: '4wheel_alignment_camber', name: '4 Wheel Alignment with Camber Caster', price: 144 },
      { id: '4wheel_alignment', name: '4 Wheel Alignment', price: 72 },
      { id: 'power_steering_fluid', name: 'Power steering fluid change', price: 156 }
    ]
  },
  {
    id: 'general_electrics', label: 'General electrics', services: [
      { id: 'battery_replacement', name: 'Battery replacement (vehicles with stop/start system)', price: null },
      { id: 'alternator_replacement', name: 'Alternator replacement', price: null },
      { id: 'starter_motor_replacement', name: 'Starter motor replacement', price: 13.08 },
      { id: 'windscreen_wiper_blades', name: 'Windscreen wiper blades (front - all) replacement', price: 36 }
    ]
  },
  {
    id: 'engine', label: 'Engine', services: [
      { id: 'timing_belt_replacement', name: 'Timing belt replacement', price: null },
      { id: 'engine_diagnostics', name: 'Engine Diagnostics', price: 36 },
      { id: 'engine_rebuilds_birmingham', name: 'Engine Rebuilds Birmingham', price: null },
      { id: 'engine_remapping_birmingham', name: 'Engine Remapping Birmingham', price: null }
    ]
  },
  {
    id: 'cooling', label: 'Cooling system', services: [
      { id: 'water_pump_replacement', name: 'Water pump replacement', price: 312 },
      { id: 'coolant_drain_refill', name: 'Coolant Drain & Refill', price: 86.40 },
      { id: 'anti_freeze_drain_refill', name: 'Anti Freeze drain & refill', price: 43.20 },
      { id: 'coolant_antifreeze_combined', name: 'Coolant/antifreeze combined drain & refill', price: 72 }
    ]
  },
  {
    id: 'suspension', label: 'Suspension', services: [
      { id: 'rear_coil_spring', name: 'Rear Coil spring (road spring) replacement', price: 240 },
      { id: 'front_coil_spring', name: 'Front Coil spring (road spring) replacement', price: null }
    ]
  },
  {
    id: 'tyres', label: 'Tyres', services: [
      { id: 'puncture_repair', name: 'Puncture Repair', price: 24 },
      { id: 'wheel_balancing', name: 'Wheel Balancing', price: 12 },
      { id: 'locking_wheel_nut_removal', name: 'One Locking Wheel Nut Removal', price: 21.6 }
    ]
  },
  {
    id: 'heating_air', label: 'Heating & air conditioning', services: [
      { id: 'air_con_regas_2017on', name: 'Air Con Re-gas (2017 onwards)', price: 100 },
      { id: 'air_con_regas_before2017', name: 'Air Con Re-gas (Before 2017)', price: 50 },
      { id: 'car_air_conditioning_birmingham', name: 'Car Air Conditioning Birmingham', price: 54 },
      { id: 'air_conditioning_service_and_regas', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 'air_conditioning_and_regas_1234yf', name: 'Air Conditioning and Regas 1234yf gas', price: 78.12 }
    ]
  },
  {
    id: 'em_fuel', label: 'Engine management - Fuel', services: [
      { id: 'add_blue_refill', name: 'Add Blue Re-fill', price: 30 }
    ]
  },
  {
    id: 'clutch_controls', label: 'Clutch & controls', services: [
      { id: 'clutch_repair_birmingham', name: 'Clutch Repair Birmingham', price: 96 }
    ]
  },
  {
    id: 'other', label: 'Other', services: [
      { id: 'anti_freeze', name: 'Anti Freeze', price: 24 },
      { id: 'dpf_cleaning_birmingham', name: 'DPF Cleaning Birmingham', price: 240 },
      { id: 'tyre_pressure_check_birmingham', name: 'Tyre Pressure Check Birmingham', price: 6 },
      { id: 'winter_check_birmingham', name: 'Winter Check Birmingham', price: 35 },
      { id: 'summer_check_birmingham', name: 'Summer Check Birmingham', price: 35 },
      { id: 'mini_valet', name: 'Mini Valet', price: 20 },
      { id: 'winter_wheel_birmingham', name: 'Winter Wheel Birmingham', price: 75 },
      { id: 'car_air_conditioning_birmingham2', name: 'Car Air Conditioning Birmingham', price: 54 },
      { id: 'air_conditioning_service_and_regas2', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 'ghost_immobiliser_birmingham', name: 'Ghost Immobiliser Birmingham', price: 600 },
      { id: 'collection_delivery_service', name: 'Collection and Delivery Service', price: 20 },
      { id: 'ultimate_treatment_package', name: 'Ultimate Treatment Package', price: 65.03 },
      { id: 'car_wash_vacuum', name: 'Car Wash & Vacuum (mini valet)', price: 14.40 },
      { id: 'adas_calibration_birmingham', name: 'ADAS Calibration Birmingham', price: 260.40 },
      { id: 'essential_treatment_package', name: 'Essential Treatment Package', price: 25.97 },
      { id: 'performance_treatment_package', name: 'Performance Treatment Package', price: 45.50 },
      { id: 'hybrid_ev_repairs_birmingham', name: 'Hybrid and EV Repairs Birmingham', price: null },
      { id: 'full_van_service_birmingham', name: 'Full Van Service Birmingham', price: 421.19 },
      { id: 'brake_repair_birmingham2', name: 'Brake Repair Birmingham', price: 132 },
      { id: 'cambelt_change_birmingham', name: 'Cambelt Change Birmingham', price: null },
      { id: 'exhaust_repair_birmingham', name: 'Exhaust Repair Birmingham', price: 241.67 },
      { id: 'car_service', name: 'Car Service', price: 250 },
      { id: 'ecu_remapping_birmingham', name: 'ECU Remapping Birmingham', price: 360 },
      { id: 'engine_rebuilds_birmingham2', name: 'Engine Rebuilds Birmingham', price: null },
      { id: 'car_detailing_birmingham', name: 'Car Detailing Birmingham', price: null },
      { id: 'engine_remapping_birmingham2', name: 'Engine Remapping Birmingham', price: null },
      { id: 'number_plate_replacement_birmingham', name: 'Number Plate Replacement Birmingham', price: null },
      { id: 'auto_electrics_repair_birmingham', name: 'Auto Electrics Repair Birmingham', price: null },
      { id: 'oil_change_birmingham', name: 'Oil Change Birmingham', price: null },
      { id: 'car_battery_birmingham', name: 'Car Battery Birmingham', price: null },
      { id: 'commercial_van_interim_service_birmingham', name: 'Commercial Van Interim Service Birmingham', price: null }
    ]
  },
  { id: 'all_repair', label: 'All Repair', services: [] }
];



const vehicleMockData = {
  reg: 'HA11AA',
  make: 'TOYOTA',
  fuel: 'PETROL'
};

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [activeTab, setActiveTab] = useState('services');
  const [regNo, setRegNo] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [tyreSize, setTyreSize] = useState({ width: '205', profile: '55', rim: '16' });
  const [tyreType, setTyreType] = useState('fully-fitted');
  const images = [why, why2, why3];

  const [showServicePopup, setShowServicePopup] = useState(false);
  const [serviceReg, setServiceReg] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(allCategories[0].id);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (!cartOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.cart-dropdown')) setCartOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [cartOpen]);

  useEffect(() => {
    if (showServicePopup) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showServicePopup]);

  function addToCart(service) {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === service.id);
      if (idx > -1) {
        return prev.map((item, i) => i === idx ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...service, qty: 1 }];
    });
    setCartOpen(true);
  }
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }
  function changeQty(id, delta) {
    setCart((prev) => prev.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }
  function handleServiceSelect(service, checked) {
    if (checked) addToCart(service);
    else removeFromCart(service.id);
  }
  function isInCart(serviceId) {
    return !!cart.find((item) => item.id === serviceId);
  }
  function handleProceedBooking() {
    navigate('/booking');
  }
  function handleOpenServicePopup() {
    if (!regNo.trim()) return;
    setServiceReg(regNo.trim().toUpperCase());
    setVehicleInfo(vehicleMockData);
    setShowServicePopup(true);
    setSelectedCategory(allCategories[0].id);
  }

  const BookingSystem = () => (
    <div
      className="mt-8 p-4 rounded-xl w-full max-w-sm mx-auto"
      style={{
        background: 'var(--bg-gradient-main)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <div className="space-y-2 mb-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-white text-black'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tyre-fitting')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === 'tyre-fitting'
                ? 'bg-white text-black'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            Tyre Fitting
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab('book-mot')}
            className={`w-full px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'book-mot'
                ? 'bg-white text-black'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <Shield className="w-4 h-4" />
            Book MOT
          </button>
        </div>
      </div>
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Enter your Reg. No. (After select service)
            </label>
            <div className="flex">
              <div className="flex items-center px-2 bg-[var(--primary-blue)] rounded-l-lg">
                <div className="w-6 h-4 bg-[var(--primary-blue-dark)] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GB</span>
                </div>
              </div>
              <input
                type="text"
                value={regNo}
                onChange={e => setRegNo(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())}
                placeholder="ENTER REG NO."
                className="flex-1 px-3 py-3 bg-[var(--primary-blue-lighter)] text-black font-bold placeholder-gray-700 rounded-r-lg focus:outline-none text-sm"
                maxLength={10}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenServicePopup}
            className="w-full bg-[var(--primary-blue)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue-dark)] transition-colors"
          >
            GO
          </button>
        </div>
      )}
      {activeTab === 'tyre-fitting' && (
        <div className="space-y-4">
          <div className="flex">
            <div className="flex items-center px-2 bg-[var(--primary-blue)] rounded-l-lg">
              <div className="w-6 h-4 bg-[var(--primary-blue-dark)] rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">GB</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="VEHICLE REG. NO."
              className="flex-1 px-3 py-3 bg-[var(--primary-blue-lighter)] text-black font-bold placeholder-gray-700 rounded-r-lg focus:outline-none text-sm"
            />
          </div>
        </div>
      )}
      {activeTab === 'book-mot' && (
        <div className="space-y-4">
          <div className="flex">
            <div className="flex items-center px-2 bg-[var(--primary-blue)] rounded-l-lg">
              <div className="w-6 h-4 bg-[var(--primary-blue-dark)] rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">GB</span>
              </div>
            </div>
            <input
              type="text"
              value={regNo}
              onChange={e => setRegNo(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())}
              placeholder="ENTER REG NO."
              className="flex-1 px-3 py-3 bg-[var(--primary-blue-lighter)] text-black font-bold placeholder-gray-700 rounded-r-lg focus:outline-none text-sm"
              maxLength={10}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <p className="text-white text-center text-sm">Don't know your vehicle registration?</p>
          <button
            type="button"
            onClick={() => {}}
            className="w-full bg-[var(--primary-blue)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue-dark)] transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <Link
            to="/mot-check"
            className="w-full bg-[var(--primary-blue-dark)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue)] transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            IS YOUR MOT DUE?
          </Link>
        </div>
      )}
    </div>
  );

  const CartDropdown = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return (
      <div className="fixed top-33 right-8 z-[1000]">
        <button
          type="button"
          className="relative bg-white rounded-full shadow-lg p-3 border border-gray-200 hover:shadow-xl transition"
          onClick={() => setCartOpen((o) => !o)}
        >
          <ShoppingCart size={28} className="text-[#1976df]" />
          {cart.length > 0 && (
            <span className="absolute -top-1.2 -right-1.5 bg-green-500 text-white rounded-full px-2 text-xs font-bold">
              {cart.reduce((sum, c) => sum + c.qty, 0)}
            </span>
          )}
        </button>
        {cartOpen && (
          <div className="cart-dropdown absolute right-0 mt-3 bg-white rounded-xl shadow-2xl p-4 min-w-[320px] w-[340px] border border-gray-200 z-50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold">Your Cart</span>
              <button type="button" onClick={() => setCartOpen(false)}>
                <XIcon size={22} />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-12">No items in cart.</div>
            ) : (
              <div>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-700">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => changeQty(item.id, -1)} disabled={item.qty === 1} className="px-1 text-lg font-bold">-</button>
                          <span className="px-1">{item.qty}</span>
                          <button type="button" onClick={() => changeQty(item.id, 1)} className="px-1 text-lg font-bold">+</button>
                        </div>
                        <span className="font-bold">£{(item.price * item.qty).toFixed(2)}</span>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-600 ml-2">
                          <XIcon size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-base">Sub-Total:</span>
                  <span className="font-bold text-lg">£{subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="w-full mt-4 bg-[#16a400] hover:bg-[#14a300] text-white py-3 rounded-lg font-bold transition"
                  onClick={handleProceedBooking}
                >
                  PROCEED TO BOOKING
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const ServicePopup = () => (
    <div className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.60)',
        backdropFilter: 'blur(10px)'
      }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <button
          type="button"
          className="absolute right-5 top-5 text-gray-600 hover:text-red-600 z-10"
          onClick={() => setShowServicePopup(false)}
        >
          <XIcon size={30} />
        </button>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-7 border-b bg-[#f8fafb]">
          <div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
            <div>
              <div className="font-bold text-lg mb-1">My Vehicle Info</div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                  Vehicle Reg.No.: <b>{serviceReg || vehicleInfo?.reg}</b>
                </div>
                <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                  Make: <b>{vehicleInfo?.make}</b>
                </div>
                <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                  Fuel: <b>{vehicleInfo?.fuel}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 380, height: "100%" }}>
          <aside
            className="border-r bg-[#f8fafb] py-6 flex flex-col gap-2"
            style={{
              width: 200,
              maxHeight: "calc(90vh - 120px)",
              overflowY: "auto",
              minHeight: 360,
            }}>
            {allCategories.map(cat => (
              <button
                type="button"
                key={cat.id}
                className={`text-left px-4 py-2 rounded-lg font-medium text-base transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#e6f4ea] text-green-700'
                    : 'hover:bg-[#e3e9f7] text-gray-700'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </aside>
          <main
            className="flex-1 overflow-y-auto py-6 px-5"
            style={{
              maxHeight: "calc(90vh - 120px)",
              minHeight: 360,
            }}
          >
            <div className="text-xl font-semibold mb-4">{allCategories.find(c => c.id === selectedCategory)?.label}</div>
            <div className="space-y-4">
              {allCategories.find(c => c.id === selectedCategory)?.services.length > 0 ? (
                allCategories.find(c => c.id === selectedCategory).services.map(service => (
                  <div key={service.id} className="flex items-center justify-between bg-[#f6f8fa] p-4 rounded-2xl shadow-sm border mb-2" style={{ borderColor: "#bdbdbd" }}>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
<span className="font-bold text-lg text-green-700">
    {typeof service.price === "number"
      ? `£${service.price.toFixed(2)}`
      : "Price on Request"}
  </span>                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-green-600"
                        checked={isInCart(service.id)}
                        onChange={e => handleServiceSelect(service, e.target.checked)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic text-center py-8">No services listed for this category.</div>
              )}
              {selectedCategory === allCategories[allCategories.length-1].id && (
                <div style={{marginTop: 20, background: "#F5F5F5", border: "1px solid #eee", padding: 16, fontWeight: 'bold'}}>
                  In case, your service is not listed above, kindly fill out the form. <a href="#">Click here.</a>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  const servicesArr = [
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
    <div className="min-h-screen relative" style={{ background: 'var(--bg-gradient-main)' }}>
      <CartDropdown />
      {showServicePopup && <ServicePopup />}
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
                <BookingSystem />
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
              <div className="relative hidden md:block">
                <div className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${hero})`,
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
      {/* SERVICES SECTION */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-light)' }}>Our Services</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
              We offer comprehensive automotive services with professional expertise and quality assurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesArr.map((service, index) => (
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
      {/* WHY CHOOSE US SECTION */}
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