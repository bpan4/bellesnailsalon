import { useState, useEffect, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FORM_ELEMENTS } from "../Constants";

type contactPageProps = {
  problemBrowser: boolean,
};

const ContactPage = ({ problemBrowser } : contactPageProps) => {
    const [isSpam, setIsSpam] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [clientEmail, setClientEmail] = useState("");

    // env variables used by EmailJS
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;

    // initialize EmailJS with the public key
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
        emailjs.init({publicKey: publicKey})
    }, []);

    // ref for the form element
    const form = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // reset all states
        setIsSpam(false);
        setSubmitted(false);
        setSendError(false);
        setEmptyError(false);

        // check if form submission is spam
        if (
            formData.get("go_away") !== "" || 
            formData.get("colour") !== "" || 
            formData.get("length") !== "" ||
            formData.get("shape") !== ""
        ) {
            setIsSpam(true);
            setSubmitted(true);
            return;
        }

        // check if form submission is valid
        if (
            formData.get("name") === "" || 
            formData.get("email") === "" || 
            formData.get("message") === ""
        ) {
            setEmptyError(true);
            return;
        }

        setClientEmail(formData.get("email") as string);

        // send email using EmailJS
        await emailjs
            .send(serviceId, templateId, {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message")
            })
            .then(
                () => {
                    setSubmitted(true);
                },
                (sendError) => {
                    console.error('Email failed to send', sendError);
                    setSendError(true);
                },
            );
    }

    const formInputs = (disabled: boolean) => {
        return (
            FORM_ELEMENTS.map((element) => {
                let input;
                if (element.type === "short") {
                    input = <input 
                        key={element.field}
                        type="text" 
                        name={element.field} 
                        placeholder={element.placeholder} 
                        disabled={disabled}
                        autoComplete="on"
                    />
                } else {
                    input = <textarea 
                        key={element.field}
                        name={element.field}
                        placeholder={element.placeholder} 
                        disabled={disabled}
                    />
                }
                return input
            })
        )
    }

    return (
        <div className="content content--about">
            <div className="text">
                <div className="title">
                    Contact
                </div>
                <div className="paragraph">
                    Please fill out the following form to get in touch!
                </div>
            </div>
            <div 
                style={{
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: "100%",
                    width: "100%"
                }}
            >
                <div 
                    style={{
                        display: "flex", 
                        flexDirection: "column",
                        justifyContent: "center", 
                        alignItems: "center", 
                        height: "100%",
                        width: "95%",
                        border: "solid #FFF 10px"
                    }}
                    ref={form}
                >
                    { isSpam &&
                        <b>Please do not spam my website!</b>
                    }
                    { problemBrowser &&
                        <span className="error centered_text">
                            To complete this form, please reopen the website outside your in-app browser!
                        </span>
                    }
                    {submitted &&
                        <span className="centered_text">
                            <p>Thank you for your message!</p>
                            <p>A reply will be sent to your email, {clientEmail}.</p>
                        </span>
                    }
                    { !submitted && !problemBrowser &&
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            style={{
                                display: "flex", 
                                flexDirection: "column",
                                justifyContent: "center", 
                                alignItems: "center", 
                                height: "100%",
                                width: "100%"
                            }}
                        >
                            { emptyError &&
                                <span className="error centered_text" style={{paddingBottom: "1vh"}}>
                                    Please fill out all the following fields to send a message.
                                </span>
                            }
                            <input type="hidden" name="go_away" value="" />
                            <input type="hidden" name="colour" value="" />
                            <input type="hidden" name="shape" value="" />
                            <input type="hidden" name="length" value="" />
                            { formInputs(problemBrowser) }
                            <button 
                                type="submit"
                                className="submit_button"
                                style={{fontWeight: "600"}}
                                disabled={problemBrowser}
                            >
                                Submit
                            </button>
                            { sendError &&
                                <span className="error centered_text">
                                    There was an error sending your message. Please try again.
                                </span>
                            }
                        </form>
                    }
                </div>
            </div>
            <div className="tinytext" style={{paddingTop: "10px"}}>
                Please know that I aim to respond to all inquiries within three business days. Thank you for your patience!
            </div>
        </div>
    );
}

export default ContactPage;