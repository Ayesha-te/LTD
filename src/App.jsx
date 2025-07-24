import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Booking from './pages/Booking';
import MyAccount from './pages/MyAccount';
import PaymentSuccess from './pages/payment-success';
import PaymentDeclined from './pages/payment-cancelled';
import ScrollToTop from './components/ScrollToTop'; // 👈 Import this

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 👈 Add here to handle scroll on route change */}

      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-account" element={<MyAccount />} />

            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentDeclined />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

