import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import InstagramItems from "./InstagramItems";
import WorkPage from "./WorkPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import { CITY } from "./Constants";
import "./App.css";

const App = () => {

  // loading state
  const [loading, setLoading] = useState(true);

  // state for window width
  const [isTablet, setIsTablet] = useState(window.innerWidth < 910);
  const [isPhone, setIsPhone] = useState(window.innerWidth < 480);

  // state for map size
  const [mapSize, setMapSize] = useState({
    width: 0.7 * window.innerWidth, 
    height: 0.4 * window.innerHeight
  });

  // manages whether sections are shown
  const [show, setShow] = useState({
    showHome: true,
    showWork: false,
    showAbout: false,
    showContact: false
  });

  // references for each section
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // scroll to top of the page when page renders/refreshes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // set loading state for 3 seconds
  useEffect(() => {
    let interval = setInterval(() => {
      setLoading(false);
    }, 4000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  // for scrolling animations
  useLayoutEffect(() => {
    // gets top of page
    const pageTop = element => element.getBoundingClientRect().top;
    
    // gets positions of each section
    const workPosition = pageTop(workRef.current);
    const aboutPosition = pageTop(aboutRef.current);
    const contactPosition = pageTop(contactRef.current);

    // scroll event
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const tenPercent = window.innerHeight * 0.3;
      if (contactPosition + tenPercent < scrollPosition) {
         setShow({
          showHome: false,
          showWork: false,
          showAbout: false,
          showContact: true
        });
      } else if (aboutPosition + tenPercent < scrollPosition) {
         setShow({
          showHome: false,
          showWork: false,
          showAbout: true,
          showContact: false
        });
      } else if (workPosition + tenPercent < scrollPosition) {
        setShow({
          showHome: false,
          showWork: true,
          showAbout: false,
          showContact: false
        });
      } else {
        setShow({
          showHome: true,
          showWork: false,
          showAbout: false,
          showContact: false
        })
      }
    };


    // event listener for when window is resized
    const updateSize = () => {
      setIsTablet(window.innerWidth < 910);
      setIsPhone(window.innerWidth < 480);
      setMapSize({
        width: 0.7 * window.innerWidth,
        height: 0.4 * window.innerHeight
      });
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSize);
    }
  }, []);

  // homepage title content
  const homepageTitle = () => {
    if (isPhone) {
      return (
        <div className="title">
          <div> Welcome to</div>
          <div> Belle's</div>
          <div>Nail Salon</div>
        </div>
      );
    } else if (isTablet) {
      return (
        <div className="title">
          <div> Welcome to</div>
          <div> Belle's Nail Salon </div>
        </div>
      );
    }
    return (
      <div className="home__title title">
        Welcome to Belle's Nail Salon
      </div>
    );
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact_anchor");
    contactSection.scrollIntoView();
  }

  // copyright section
  const copyright = () => {
    const currentYear = new Date().getFullYear();
    return <p className="tinytext centered_text"> 
      &copy; Belle's Nail Salon {currentYear} 
    </p>
  }

  // footnotes section
  const footnotes = () => {
    return <p className="tinytext centered_text">
      Source code available to fellow developers upon request!
    </p>
  }

  return (
    <div className="wrapper">  
      {/* {loading && <div className="loading"> Loading... </div>} */}
        <div style={{
          // visibility: loading ? "hidden" : "visible", 
          // animation: loading ? "" : "fade-in 2s"
        }}>
          {/* Home */}
          <Subsection
            animate={show.showHome} 
            className="subsection subsection--home"
          >
            <div className="content content--home">
              <div className="text">
                { homepageTitle() }
                <div className="paragraph">A {CITY}-based home nail salon</div>
              </div>
              <InstagramItems />
            </div>
          </Subsection>

          {/* Work and Pricing */}
          <Subsection 
            animate={show.showWork} 
            ref={workRef}
            className="subsection subsection--work"
          >
            <WorkPage />
          </Subsection>
          
          {/* About and Appointments */}
          <Subsection 
            animate={show.showAbout} 
            ref={aboutRef}
            className="subsection subsection--about"
          >
            <AboutPage
              scrollToContact={scrollToContact}
              mapSize={mapSize} 
            />
          </Subsection>

          {/* Contact */}
          <Subsection 
            animate={show.showContact} 
            ref={contactRef}
            className="subsection subsection--contact"
            id="contact_anchor"
          >
            <ContactPage />
          </Subsection>
          {copyright()}
          {footnotes()}
        </div>
    </div>
  );
};

const Subsection = styled.div`
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
`;

export default App;
