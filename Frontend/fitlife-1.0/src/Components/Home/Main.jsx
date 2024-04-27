import React from "react";
import { Link } from "react-router-dom";

const Main = ({ onOpenAuth }) => {
  return (
    <main>
      <article>
        <section
          className="section hero bg-dark has-after has-bg-image"
          id="home"
          aria-label="hero"
          data-section
          style={{ backgroundImage: `url("./assets/images/hero-bg.png")` }}
        >
          <div className="container">
            <div className="hero-content">
              <p className="hero-subtitle">
                <strong className="strong">The Best</strong>Fitness Club
              </p>

              <h1 className="h1 hero-title">Achieve Your Fitness Goals</h1>

              <p className="section-text">
                Start your journey today and transform your life.
              </p>

              <div
                onClick={() => {
                  onOpenAuth();
                }}
                className="btn btn-primary"
              >
                Get Started
              </div>
            </div>

            <div className="hero-banner">
              <img
                src="./assets/images/hero-banner.png"
                width="660"
                height="753"
                alt="hero banner"
                className="w-100"
              />

              <img
                src="./assets/images/hero-circle-one.png"
                width="666"
                height="666"
                aria-hidden="true"
                alt=""
                className="circle circle-1"
              />
              <img
                src="./assets/images/hero-circle-two.png"
                width="666"
                height="666"
                aria-hidden="true"
                alt=""
                className="circle circle-2"
              />

              <img
                src="./assets/images/heart-rate.svg"
                width="255"
                height="270"
                alt="heart rate"
                className="abs-img abs-img-1"
              />
              <img
                src="./assets/images/calories.svg"
                width="348"
                height="224"
                alt="calories"
                className="abs-img abs-img-2"
              />
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-label="about">
          <div className="container">
            <div className="about-banner has-after">
              <img
                src="./assets/images/about-banner.png"
                width="660"
                height="648"
                loading="lazy"
                alt="about banner"
                className="w-100"
              />

              <img
                src="./assets/images/about-circle-one.png"
                width="660"
                height="534"
                loading="lazy"
                aria-hidden="true"
                alt=""
                className="circle circle-1"
              />
              <img
                src="./assets/images/about-circle-two.png"
                width="660"
                height="534"
                loading="lazy"
                aria-hidden="true"
                alt=""
                className="circle circle-2"
              />

              <img
                src="./assets/images/fitness.png"
                width="650"
                height="154"
                loading="lazy"
                alt="fitness"
                className="abs-img w-100"
              />
            </div>

            <div className="about-content">
              <p className="section-subtitle">About Us</p>

              <h2 className="h2 section-title">Welcome To Our Fitness Gym</h2>

              <p className="section-text"></p>

              <p className="section-text">
                Great to work with FitLife, Amazing expereince
              </p>

              <div className="wrapper">
                <div className="about-coach">
                  <figure className="coach-avatar">
                    <img
                      src="./assets/images/about-coach.jpg"
                      width="65"
                      height="65"
                      loading="lazy"
                      alt="Trainer"
                    />
                  </figure>

                  <div>
                    <h3 className="h3 coach-name">John Doe</h3>

                    <p className="coach-title">Our Coach</p>
                  </div>
                </div>

                <Link to="#" className="btn btn-primary">
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section video" aria-label="video">
          <div className="container">
            <div
              className="video-card has-before has-bg-image"
              style={{
                backgroundImage: "url('./assets/images/video-banner.jpg')",
              }}
            >
              <h2 className="h2 card-title">Explore Fitness Life</h2>

              <button className="play-btn" aria-label="play video">
                <ion-icon name="play-sharp" aria-hidden="true"></ion-icon>
              </button>

              <Link to="#" className="btn-link has-before">
                Watch More
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Main;
