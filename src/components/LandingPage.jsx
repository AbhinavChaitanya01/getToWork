import React from 'react'
import './LandingPage.css'
import {Link} from "react-router-dom";
import {Accordion,AccordionSummary, AccordionDetails,Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const LandingPage = () => {
  return (
    <div className='landingBody'>
        <section className="intro">
        <div className="main-landing-content">
            <p className="main-theme-text">Your search ends here.</p>
            <p className="secondary-theme-text">Give your career a head start</p>
            <button className="cta-button"><Link style={{textDecoration:"none",color:'#000'}} to="/signup">Give it a try - It's free!</Link></button>
        </div>
        <div className="landing-Img">
            <img src="landingImg.jpg" alt=""/>
        </div>
    </section> 

    <section className="sub-intro">
        <p className="buzz-text"><i className="ticks fa-solid fa-check-double" ></i>You will get numerous job openings that suit you best. Explore the plethora of opportunities around you and land up at the kind of job you've always dreamt of.</p>
        <p className="buzz-text"><i className="ticks fa-solid fa-check-double" ></i>Each person has a unique skill-set. getToWork has jobs that match skill-set and will suit you to grow.</p>
        <p className="buzz-text"><i className="ticks fa-solid fa-check-double" ></i>We verify the recruiters and keep your data safe. So that you soar high and fly free in your career!</p>

    </section>
    <section id="Testimonials">
        <p className="testimonial-heading">Our testimonials</p>
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleLight" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="5000">
                    <div className="container">
                        <div className="image">
                            <img className="testimonial-image" src="testmo1.jpg" 
                                alt="..."/>
                        </div>
                        <div className="text">
                            <p className="testimonial-text">"getToWork helped me a lot . The recruiters always responded on time. Now, here I'm in Seattle. Thank you!"</p>
                        </div>
                    </div>
    
                </div>
                <div className="carousel-item" data-bs-interval="5000">
                    <div className="container">
                        <div className="image">
                            <img className="testimonial-image" src="testmo2.jpg" 
                                alt="..." />
                        </div>
                        <div className="text">
                            <p className="testimonial-text">"My experience with this portal was awesome. I applied for so many jobs and the process was always seamless."</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item" ata-bs-interval="5000">
                    <div className="container">
                        <div className="image">
                            <img className="testimonial-image" src="testmo3.jpg" 
                                alt="..."/>
                        </div>
                        <div className="text">
                            <p className="testimonial-text">"I finally achieved the work-life I aimed for. Thanks getToWork for making this possible for me."</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </section>
    <section id="FAQs">
        <p className="FAQ-heading">FAQs</p>
        <Accordion style={{backgroundColor:"#91F2E9"}}>
            <AccordionSummary id='panel1-header' aria-controls='panel1-content' expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
                <Typography>
                    Is it really free? Is there any premium?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Yeah, it's totally free! We do not believe in premiums for our products.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor:"#91F2E9"}}>
            <AccordionSummary id='panel2-header' aria-controls='panel2-content' expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
                <Typography>
                    How long does it take for recruiters to reply?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    We want to make it clear that getToWork just connects recruiters to the job-seekers. Once the job-seeker applies for a job, the application is instantly made available to the recruiter. However we request the recruiters to reply asap post the deadline, so that you are not kept waiting!
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor:"#91F2E9"}}>
            <AccordionSummary id='panel2-header' aria-controls='panel2-content' expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
                <Typography>
                    How many jobs can I apply at a time?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Seriously, we do not have any limits to the number of of jobs you can apply to at a time. However, we recommend you to apply wisely and we wish you get the job of your choice really soon.
                </Typography>
            </AccordionDetails>
        </Accordion>
    </section>
    <footer id="contact">
        <h2>Contact</h2>
        <ul className="nav justify-content-center">
            <li className="nav-item" ><p><i className="fa-solid fa-phone "></i>  +91 99xxxxxxxx</p> </li>
            <li className="nav-item" ><a href="mailto:customercare.gettowork@gmail.com"> <i className="fa-solid fa-envelope fa-2x" style={{color:"#91F2E9"}}></i></a></li>
            <li className="nav-item" ><a className="footfa" href="/"><i className="fa-brands fa-instagram fa-2x" style={{color:"#91F2E9"}}></i></a></li>
        </ul>
        <p>customercare@gettowork.com</p>
        <p>&copy; 2023</p>
    </footer>
    </div>
  )
}

export default LandingPage
