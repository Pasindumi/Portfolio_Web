import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Resume from "../components/Resume"; // Replaced Certificates with Resume (Certificates is now a tab)
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Resume />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
