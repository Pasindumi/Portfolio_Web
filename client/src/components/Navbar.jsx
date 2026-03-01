import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) return null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount === 5) {
      setClickCount(0);
      navigate("/admin/login");
    } else {
      setClickCount(newCount);
      // Reset count after 2 seconds of inactivity
      setTimeout(() => setClickCount(0), 2000);
    }
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const NavItem = ({ to, children }) => {
    if (location.pathname !== "/") {
      return <li><span onClick={() => { navigate("/"); setTimeout(() => { document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' }) }, 100); closeMenu(); }}>{children}</span></li>;
    }
    return (
      <li>
        <ScrollLink to={to} smooth={true} duration={800} offset={-100} onClick={closeMenu}>
          {children}
        </ScrollLink>
      </li>
    );
  };

  return (
    <nav className="navbar">
      <motion.div
        className="elegant-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        onClick={handleLogoClick}
      >
        <span className="logo-p">P</span>
        <span className="logo-m">M</span>
      </motion.div>

      {/* Hamburger Icon */}
      <div className="mobile-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={isOpen ? "active" : ""}>
        <NavItem to="hero">Home</NavItem>
        <NavItem to="about">About</NavItem>
        <NavItem to="resume">Resume</NavItem>
        <NavItem to="projects">Projects</NavItem>
        <NavItem to="contact">Contact</NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
