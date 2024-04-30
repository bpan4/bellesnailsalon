import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";

const App = () => {
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
  }, [])

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

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyright = () => {
    const currentYear = new Date().getFullYear();
    return <p> &copy; Belle's Nail Salon {currentYear} </p>
  }

  return (
    <>
      <div className="wrapper">
        <Subsection
          animate={show.showHome} 
          className="subsection home"
        >
          HOME
        </Subsection>
        <Subsection 
          animate={show.showWork} 
          ref={workRef}
          className="subsection work"
        >
          WORK SECTION
        </Subsection>
        
        <Subsection 
          animate={show.showAbout} 
          ref={aboutRef}
          className="subsection about"
        >
          ABOUT SECTION
        </Subsection>
        <Subsection 
          animate={show.showContact} 
          ref={contactRef}
          className="subsection contact"
        >
          CONTACT SECTION
        </Subsection>
        {copyright()}
      </div>
    </>
  );
};

const Subsection = styled.div`
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
`;

export default App;
