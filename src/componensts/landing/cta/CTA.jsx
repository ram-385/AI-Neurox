import React from "react";
import "./CTA.css";
import { NavLink } from "react-router-dom";

function CTA() {
    return (
        <section className="cta">

            <h2>Ready to Build Your AI Pipeline?</h2>

            <NavLink to="/upload">
                <button className="cta-btn">Get Started →</button>
            </NavLink>

        </section>
    );
}

export default CTA;