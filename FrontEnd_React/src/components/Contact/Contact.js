import React from 'react';
import './Contact.css'

const Contact = () => {
    return (
        <div className='contact row d-flex justify-center'>
            <div className='col-md-4'>
                <form className='row p-4 rounded'>
                    <div className="form-group mt-2">
                        <label for="name">Name</label>
                        <input type="text" className="form-control mt-2" id="name" placeholder="Name"/>
                    </div>
                    <div className="form-group mt-2">
                        <label for="email">Email</label>
                        <input type="email" className="form-control mt-2" id="email" placeholder="name@example.com"/>
                    </div>
                    <div className="form-group mt-2">
                    <label for="message">Message</label>
                        <textarea className="form-control mt-2" id="message" placeholder="Your message" rows="3"></textarea>
                    </div>
                    <div className="form-group mt-2">
                        <label for="file">Upload your portfolio - zip file</label>
                        <input class="form-control mt-2" id="formFileLg" type="file"/>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;