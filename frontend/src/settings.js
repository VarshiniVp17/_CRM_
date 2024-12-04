import React from "react";
import "./settings.css"; // Import your CSS for styling

const settings = () => {
  return (
    <>
      <div className="overlay"></div>
      <div className="stars" aria-hidden="true"></div>
      <div className="starts2" aria-hidden="true"></div>
      <div className="stars3" aria-hidden="true"></div>
      <main className="main">
        <section className="contact">
          <h1 className="title">Awesome Thing</h1>
          <h2 className="sub-title">Site Under Construction</h2>
        </section>
      </main>
    </>
  );
};

export default settings;
