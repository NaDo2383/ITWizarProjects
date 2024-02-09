import styled from 'styled-components';
import useIndicatorMenu from './useIndicatorMenu';

function IndicatorMenu({ menuItems }) {
    const  {
        indicatorPosition,
        indicatorWidth,
        handleClick,
        navElement
    }  = useIndicatorMenu("menu-ul")
    return (
        <Container>
            <Navigation ref={navElement}>
                <Ul id="menu-ul">
                    <Link onClick={handleClick}>Home</Link>
                    <Link onClick={handleClick}>About</Link>
                    <Link onClick={handleClick}>Contact</Link>
                    <Link onClick={handleClick}>Log out</Link>
                </Ul>
                <Indicator
                    style={{
                        width: `${indicatorWidth}px`,
                        left: `${indicatorPosition}px`,
                        transition: '0.5s ease all',
                    }}
                />
            </Navigation>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

// Navigation
const Navigation = styled.nav`
  background-color: #808080;
  position: relative;
`;

// Ul
const Ul = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  text-align: center;
  font-weight: bold;
`;

// Link
const Link = styled.li`
  position: relative;
  margin: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: inline;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

// Indicator
const Indicator = styled.div`
  position: absolute;
  bottom: -5px;
  height: 3px;
  background-color: pink;
`;

export default IndicatorMenu
