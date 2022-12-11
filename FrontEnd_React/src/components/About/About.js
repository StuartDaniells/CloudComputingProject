import React from 'react';
import pdf from './AboutUs.pdf';
import "./about.css"

const About = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='d-flex justify-content-center'>
                        <iframe title="FolioMagic" 
                        src="https://drive.google.com/file/d/1OtaLWS21OvtgGB_ifSX0bU4Bxx-A1IZ1/preview" 
                        width="1000px" 
                        height="1000px" 
                        allow="autoplay"></iframe>
                        
                        {/* <embed
                            src="https://drive.google.com/file/d/1OtaLWS21OvtgGB_ifSX0bU4Bxx-A1IZ1/view?usp=share_link"
                            type="application/pdf"
                            frameBorder="0"
                            scrolling="auto"
                            height="1000px"
                            width="1000px"
                        ></embed>   */}
                </div>
            </div>
        </div>
    );
};
        // <div className='about md-4'>
        //     <h1>Test</h1>

            

        //     <div className='container'>
        //         <div className='row'>
        //             <div className='col-md-6 bg-light rounded'>
        //                 <div className='text-left' style={{textAlign: "left"}}>
        //                     <h1> Fall 2022, 3rd Term</h1>
        //                     <h1> CSD 4553 - 01, Cloud Computing</h1>
        //                     <h1> William Pourmajidi </h1>
        //                     <h1> 10th December 2022 </h1>
        //                     <hr/>
        //                     <h1>What we do</h1>
        //                     <p>A unique way to showcase your work and let others know about yourself. 
        //                         It’s like an evergreen platform for your projects, case studies, and information about you. 
        //                         In addition, it’s one of the best ways to express your personality, experience, and capabilities.
        //                         Having your own website means customers are always able to find you and if interested, reach out for you. 
        //                         If you don’t have an online presence nowadays, you are behind the times.
        //                             A portfolio is a great way for photographers, designers, developers and a wide range of artists to present their work online. 
        //                             It lets you reflect your identity through your works – photos, graphic design, sketches, etc.
        //                             In a nutshell, you need a portfolio website to showcase your work. Whether you’re an individual, 
        //                             a small team of two or a company of ten people, it’s crucial that you have a unique online approach. 
        //                             A website portfolio will help you stand out from the crowd, show your uniqueness, 
        //                             build trust, and make sure that others can actually find you. What happens when someone needs a logo for 
        //                             a new product, service, or company? Most will start a search through simple Google 
        //                             (or they might get suggestions from friends or business partners). So firstly, you want to be searchable.
        //                             We will help you do exactly these so that you can focus on what's more important.
        //                             We will keep your portfolios on our database and the recruiters can go through them to match their requirements.
        //                         </p>
        //                 </div>
        //             </div>
        //             <div className='col-md-6'>
        //                 <img src={img} className="rounded" alt="" />
        //             </div>
        //         </div>
        //     </div>
        // </div> 

export default About;