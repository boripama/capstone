import React, { Component } from 'react';

class LandingPage extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="landingPageBody">
        <header className="header1">
          <div className="header1__logo-box">       
          </div>
          <div className="header1__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">Ready to run?</span>
              <span className="heading-primary--sub">Let's get started!</span>
            </h1>
            <a href="#" className="btn btn--white btn--animated">Find out more</a>
          </div>
        </header>


        <main>
          <section className="section-about">
            <div className="u-center-text u-margin-top-big u-margin-bottom-big">
              <h2 className="heading-secondary">
                The ultimate site for athletes!
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
                  <figcaption className="story__caption">Mary Smith</figcaption>
                </figure>
                <div className="story__text">
                  <div className="h3 heading-tertiary u-margin-bottom-small">And I ran! I ran so far away!</div>
                  <p>Been using Ananda for the last 10 weeks. It's kept me really motivated and I get to keep up with all of my runner friends</p>

                </div>
              </div>
            </div>

            <div className="row">
              <div className="story">
                <figure className="story__shape">
                  <figcaption className="story__caption">Jack Wilson</figcaption>
                </figure>
                <div className="story__text">
                  <div className="h3 heading-tertiary u-margin-bottom-small">My favorite social media site!</div>
                  <p>Couldn't be more happy so far. I've gotten in much better shape competing daily against my good buddies Will and Phil.</p>

                </div>
              </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
              <a href="#" className="btn-text">Read all stories &rarr;</a>
            </div>
          </section>

        </main>


        <footer className="footer">
          <div className="footer__logo-box">
            </div>
            <div className="row">
              <div className="col-1-of-2">
                <div className="footer__navigation">
                  <ul className="footer__list">
                    <li className="footer__item"><a href="#" className="footer__link">Company</a></li>
                    <li className="footer__item"><a href="#" className="footer__link">Contact us</a></li>
                    <li className="footer__item"><a href="#" className="footer__link">Careers</a></li>
                    <li className="footer__item"><a href="#" className="footer__link">Privacy policy</a></li>
                    <li className="footer__item"><a href="#" className="footer__link">Terms</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-1-of-2">
                <p className="footer_copyright">
                  Built by <a href="#" className="footer__link">Bond Davis, Pattrick Gund, Rick Polidoro, Matthew Thor</a>
                </p>
              </div>
            </div>
        </footer>
      </div>

    )
  }
}

export default LandingPage;
