import React from "react";
import { INSTAGRAM_URL, NEAREST_TRANSIT_STATION, STUDIO_ACCESSIBILITY } from "./Constants";

const AboutPage = ({ scrollToContact, mapSize }) => {
    return (
        <div className="content content--about">
            <div className="text">
                <div className="title">
                    Location and Appointments
                </div>
                <div className="paragraph">
                    {`I am located near the `}
                    <a 
                        href={NEAREST_TRANSIT_STATION.url} 
                        target="_blank"
                        rel="noreferrer"
                    >
                        {NEAREST_TRANSIT_STATION.name}
                    </a>
                    {`. Please plan your trip accordingly to avoid being late.`}
                </div>
                <div className="paragraph">
                    {`To book an appointment, please fill out the `}
                    <span 
                        onClick={scrollToContact}
                        style={{textDecoration: "underline", cursor: "pointer"}}
                    >
                        contact form
                    </span>
                    {` below, or contact me via `}
                    <a 
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram DMs
                    </a>.
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
                <iframe 
                    title="transit-station-map"
                    src={NEAREST_TRANSIT_STATION.embeddedUrl} 
                    width={mapSize.width}
                    height={mapSize.height}
                    allowFullScreen
                    // loading="eager"
                    loading="lazy"
                    className="map"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="tinytext" style={{paddingTop: "10px"}}>
                <b>Accessibility</b>
                {`: The ${NEAREST_TRANSIT_STATION.name} is ${NEAREST_TRANSIT_STATION.accessibility}. `}
                {
                    NEAREST_TRANSIT_STATION.accessibilityVerifier !== "" && 
                    <span>
                        {`You may check the accessibility status of the ${NEAREST_TRANSIT_STATION.name} `}
                        <a 
                            href={NEAREST_TRANSIT_STATION.accessibilityVerifier}
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>
                        {`. `}
                    </span>
                } 
                {STUDIO_ACCESSIBILITY}.
            </div>
        </div>
    );
}

export default AboutPage;