import './Portfolio.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Portfolio = (props) => {
    return (
        <div className='card-item col-md-3 mt-5'>
            <Card className="p-3" style={{ width: '15rem' }}>
                <Card.Img variant="top" src={props.person.imageUrl} />
                <Card.Body>
                    <Card.Title>{props.person.name}</Card.Title>
                    <Card.Text>{props.person.username}</Card.Text>
                    <a href={props.person.portfolio_link} target="_blank" rel="noreferrer">
                        <Button variant="primary">Visit Portfolio</Button>
                    </a>
                </Card.Body>
            </Card>
        </div>
        
      );
};

export default Portfolio;