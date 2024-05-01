import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import InstagramItems from "./InstagramItems";
import PricingTable from "./PricingTable";
import { CITY, PRICING_NOTICES } from "./Constants";
import "./App.css";

const App = () => {

  // loading state
  const [loading, setLoading] = useState(true);

  // state for window width
  const [isTablet, setIsTablet] = useState(window.innerWidth < 910);
  const [isPhone, setIsPhone] = useState(window.innerWidth < 480);

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
    }, 3000);
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

  const pricingNotices = () => {
    return (
      <div>
        {PRICING_NOTICES.map((notice) => {
          return <p className="tinytext">*<b>{notice.title}</b>: {notice.content}</p>
        })}
      </div>
    );
    
  }

  // copyright section
  const copyright = () => {
    const currentYear = new Date().getFullYear();
    return <p style={{textAlign: "center"}}> &copy; Belle's Nail Salon {currentYear} </p>
  }

  return (
    <div className="wrapper">  
      {loading && <div>loading</div>}
        <div style={{
          visibility: loading ? "hidden" : "visible", 
          animation: loading ? "" : "fade-in 2s"
        }}>
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
          <Subsection 
            animate={show.showWork} 
            ref={workRef}
            className="subsection subsection--work"
          >
            <div className="content content--work">
              <div className="text">
                <div className="title">
                  My Work
                </div>
                <div className="paragraph">
                  I specialize in gel manicures on natural nails and regular polish manicures.
                </div>
                <div className="paragraph">
                  To see my work, please visit my Instagram page, @
                  <a href="https://www.instagram.com/nail.chimp/">nail.chimp</a>.
                </div>
              </div>
              <div className="text">
                <div className="subtitle subtitle--pricing">
                  Pricing
                </div>
              </div>
              <div className="pricing__container">
                <PricingTable/>
              </div>
              <div className="text">
                { pricingNotices() }
              </div>
            </div>
          </Subsection>
          
          <Subsection 
            animate={show.showAbout} 
            ref={aboutRef}
            className="subsection subsection--about"
          >
            ABOUT SECTION
          </Subsection>
          <Subsection 
            animate={show.showContact} 
            ref={contactRef}
            className="subsection subsection--contact"
          >
            CONTACT SECTION
          </Subsection>
          {copyright()}
        </div>
    </div>
  );
};

const Subsection = styled.div`
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
`;

export default App;
