import Tilt from 'react-tilt'
import './Logo.css';
import face from './images.png';

const logo = () => {
    return(
        <div className='ml4 placement_logo tc'>
            <Tilt className="Tilt br4 shadow-2" options={{ max : 50 }} >
            <img className="Tilt-inner" alt="face_recognition" src={face}/>
            </Tilt>
        </div>
    )
}

export default logo;