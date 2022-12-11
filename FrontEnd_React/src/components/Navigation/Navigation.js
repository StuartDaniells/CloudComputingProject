import './Navigation.css';

const Nav = ({onRouteChange}) => {
    return(
        <nav className='placement_nav'>
            
{/* Since we are invoking the function here itself with the parameter value,
    we get the error message:
        Error: Maximum update depth exceeded. 
        This can happen when a component repeatedly calls setState 
        inside componentWillUpdate or componentDidUpdate. 
        React limits the number of nested updates to prevent infinite loops. 
*/}

{/* This is because onClick is an event handler and will keep listening
    for a 'click' event to invoke the function (not its invocation) passed to it.
    
    However, [without arrow funct.]  we are passing the function invocation directly
    and it thus exceeds the Call stack limit. 
*/}

            <p 
                onClick={() => onRouteChange('signin')} 
                style={{color: 'white'}} 
                className='f4 link dim black underline pa3 pointer'>
            Sign Out
            </p>
        </nav>
    )
}

export default Nav;