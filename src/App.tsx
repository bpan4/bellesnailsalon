import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import InstagramItems from "./pages/InstagramItems";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { CITY } from "./Constants";
import Logo from "./resources/logo.png";
import "./App.css";
import { SubsectionType } from "./resources/Interface";

const App = () => {

  // loading state
  const [loading, setLoading] = useState(true);

  // state for window width
  const [isTablet, setIsTablet] = useState(window.innerWidth < 910);
  const [isPhone, setIsPhone] = useState(window.innerWidth < 480);

  // state for window height
  const [isShort, setIsShort] = useState(window.innerHeight < 600);

  // state for checking what browser is being used
  // transitions do not work on Facebook and Instagram browsers
  const [problemBrowser, setProblemBrowser] = useState(false);

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
  const homeRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // set loading state for 3 seconds
    let interval = setInterval(() => {
      setLoading(false);
    }, 4000);

    // scroll to top of the page when page renders/refreshes
    window.scrollTo(0, 0);
    window.history.scrollRestoration = 'manual';

    // detect browser being used
    setProblemBrowser(
      navigator.userAgent.includes("Instagram") || 
      navigator.userAgent.includes("FBAN") || 
      navigator.userAgent.includes("FBAV")
    );

    return () => {
      clearInterval(interval);
    }
  }, []);

  // for scrolling animations
  useLayoutEffect(() => {
    // gets top of page
    const pageTop = (element: HTMLElement) => element?.getBoundingClientRect().top;
    
    // gets positions of each section
    const workPosition = pageTop(workRef.current as HTMLElement);
    const aboutPosition = pageTop(aboutRef.current as HTMLElement);
    const contactPosition = pageTop(contactRef.current as HTMLElement);

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
      setIsShort(window.innerHeight < 600);
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
    const contactSection: HTMLElement = document.getElementById("contact_anchor") as HTMLElement;
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
      {loading && 
        <div 
          className="text centered_text" 
          style={{alignItems: "center"}}
        >
          <img 
            src={Logo} 
            alt="Instagram post from @nail.chimp"
            className="logo"
          />
          <div className="loading"> Loading... </div>
          { problemBrowser && 
            <p>For optimal viewing experience, kindly access the website outside your in-app browser, as some features may not display correctly within it.</p>
          }
        </div>
      }
        <div style={{
          visibility: loading ? "hidden" : "visible", 
          animation: loading ? "" : "fade-in 2s"
        }}>
          { problemBrowser && 
            <p className="centered_text paragraph">For optimal viewing experience, kindly access the website outside your in-app browser, as some features may not display correctly within it.</p>
          }
          {/* Home */}
          <Subsection
            style={isShort ? {transition: "none", transform: "none"} : {}}
            animate={show.showHome}
            ref={homeRef}
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
            style={isShort ? {transition: "none", transform: "none"} : {}}
            animate={show.showWork} 
            ref={workRef}
            className="subsection subsection--work"
          >
            <WorkPage />
          </Subsection>
          
          {/* About and Appointments */}
          <Subsection 
            style={isShort ? {transition: "none", transform: "none"} : {}}
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
            style={isShort ? {transition: "none", transform: "none"} : {}}
            animate={show.showContact} 
            ref={contactRef}
            className="subsection subsection--contact"
            id="contact_anchor"
          >
            <ContactPage problemBrowser={problemBrowser}/>
          </Subsection>
          {copyright()}
          {footnotes()}
        </div>
    </div>
  );
};

const Subsection = styled.div<SubsectionType>`
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
`;

export default App;
