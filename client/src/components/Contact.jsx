import React, { useState } from "react";
import { sendContact } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaAddressCard, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Contact.css";

// Move sections OUTSIDE to prevent re-defining components on every render (fixing the focus bug)
const FormSection = ({ form, setForm, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="contact-form">
    <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
    <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
    <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
    <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
    <textarea placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
    <button type="submit" className="btn-submit">SEND</button>
  </form>
);

const DetailsSection = () => (
  <div className="contact-details-container">
    <div className="detail-item">
      <FaEnvelope className="detail-icon" />
      <span>pasinduamarasinghe0528@gmail.com</span>
    </div>
    <div className="detail-item">
      <FaPhoneAlt className="detail-icon" />
      <span>+94 77 860 2219</span>
    </div>
    <div className="detail-item">
      <FaMapMarkerAlt className="detail-icon" />
      <span>Colombo, Sri Lanka</span>
    </div>

    <div className="social-links">
      <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
      <a href="https://github.com/Pasindumi" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [activeTab, setActiveTab] = useState("form"); // 'form' or 'details'

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContact(form);
    alert("Message sent!");
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  // Generate 60 segments for the circular dial
  const totalSegments = 60;
  const ringSegments = Array.from({ length: totalSegments }).map((_, index) => {
    const rotation = index * (360 / totalSegments);
    const isLeftHalf = rotation >= 180 && rotation < 360;

    return (
      <div
        key={index}
        className={`dial-segment ${isLeftHalf ? 'left-half' : 'right-half'}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    );
  });

  return (
    <section id="contact" className="contact-section">
      <div className="contact-title-container">
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Connect with <span>Me</span>
        </motion.h2>
      </div>

      {/* Desktop View: The Interactive Dial */}
      <div className={`contact-interface pc-only ${activeTab === 'form' ? 'form-active' : 'details-active'}`}>
        <div className="contact-dial">
          {ringSegments}
        </div>

        <div className="contact-content-area">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form"
                className="content-pane"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                <FormSection form={form} setForm={setForm} handleSubmit={handleSubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="details"
                className="content-pane"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.4 }}
              >
                <DetailsSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="dial-toggles">
          <div
            className={`dial-toggle-btn left-toggle ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
            title="Contact Form"
          >
            <FaEnvelope />
          </div>
          <div
            className={`dial-toggle-btn right-toggle ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
            title="Contact Details"
          >
            <FaAddressCard />
          </div>
        </div>
      </div>

      {/* Mobile View: Standard Vertical Layout */}
      <div className="contact-mobile-layout mobile-only">
        <div className="mobile-form-wrap">
          <FormSection form={form} setForm={setForm} handleSubmit={handleSubmit} />
        </div>
        <div className="mobile-details-wrap">
          <DetailsSection />
        </div>
      </div>
    </section>
  );
};

export default Contact;
