import React, { Component } from 'react';

class LandingPage extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header__logo-box">
            <img src="img/logo-white.png" alt="Logo" className="header__logo" />
          </div>
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">Ready to run?</span>
              <span className="heading-primary--sub">Let's get started!</span>
            </h1>

            <a href="#" className="btn btn--white btn--animated">Find out more</a>
          </div>

        </header>


        <main>
          <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
              <h2 className="heading-secondary">
                The ultimate site for your athletes!
                    </h2>
            </div>

            <div className="row">
              <div className="col-1-of-2">
                <h3 className="heading-tertiary u-margin-bottom-small">Its so easy</h3>
                <p className="paragrapth">
                  All you need to do is upload your fitbit gpx files and track your progress immediately.
                            </p>

                <h3 className="heading-tertiary u-margin-bottom-small">Make friends</h3>
                <p className="paragrapth">
                  Find friends who are in your skill level who take similar routes at similar times of the day.
                            </p>

                <a href="#" className="btn-text">Learn more &rarr;</a>
              </div>
              <div className="col-1-of-2">
                <div className="composition">
                  <img src="img/nat-1-large.jpg" alt="Photo 1" className="composition__photo composition__photo--p1" />
                  <img src="img/nat-2-large.jpg" alt="Photo 2" className="composition__photo composition__photo--p2" />
                  <img src="img/nat-3-large.jpg" alt="Photo 3" className="composition__photo composition__photo--p3" />
                </div>
              </div>
            </div>
          </section>


          <section className="section-stories">
            <div className="bg-video">
              <video className="bg-video__content" autoPlay muted loop>
                <source src="../../../public/videos/Park-Stroll/MP4/Park-Stroll.mp4" type="video/mp4" />
                <source src="public/videos/Park-Stroll/WEBM/Park-Stroll.webm" type="video/webm" />
                Your browser is not supported!
                </video>
            </div>
            <div className="u-center-text u-margin-bottom-big">
              <h2 className="heading-secondary">
                We make people genuinely happy
                    </h2>
            </div>

            <div className="row">
              <div className="story">
                <figure className="story__shape">
                  <img src="img/nat-8.jpg" alt="Person on a tour" className="story__img" />
                  <figcaption className="story__caption">Mary Smith</figcaption>
                </figure>
                <div className="story__text">
                  <div className="h3 heading-tertiary u-margin-bottom-small">I had the best week ever with my family</div>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus autem id minima, Necessitatibus autem id minima, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus autem id minima, Necessitatibus autem id minima, tatibus autem id minima.</p>

                </div>
              </div>
            </div>

            <div className="row">
              <div className="story">
                <figure className="story__shape">
                  <img src="img/nat-9.jpg" alt="Person on a tour" className="story__img" />
                  <figcaption className="story__caption">Jack Wilson</figcaption>
                </figure>
                <div className="story__text">
                  <div className="h3 heading-tertiary u-margin-bottom-small">WOW! My life is completely different now</div>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus autem id minima, Necessitatibus autem id minima, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus autem id minima, Necessitatibus autem id minima, tatibus autem id minima.</p>

                </div>
              </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
              <a href="#" className="btn-text">Read all stories &rarr;</a>
            </div>
          </section>

        </main>
      </div>

    )
  }
}

export default LandingPage;
