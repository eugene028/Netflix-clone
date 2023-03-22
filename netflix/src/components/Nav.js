import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener('scroll', () => {})
        }
    }, []);
    return (
        <NavBar show = {show}>
                <img alt ="Netflix logo"
                    src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                    className = "nav__logo"
                    onClick = {() => window.location.reload()}
                />
                <InputSearch value = {searchValue} 
                    onChange={handleChange} 
                    className="nav__input" 
                    type ="text" 
                    placeholder = "Search" />
                <img alt="User logged"
                    src = "https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                    className='nav__avatar'
                />
        </NavBar>
    );
};

const NavBar = styled.div`
    position: fixed;
    z-index:5000;
    top : 0;
    width : 100%;
    height:30px;
    padding: 20px;
    display: flex;
    justify-content : space-between;
    align-items : center;
    transition-timing-function: ease-in;
    transition : all 0.5s;
    background-color : ${(props) => props.show? "#111" : "transparent"};
    .nav__avatar{
        position: fixed;
        width:30px;
        right: 40px;
        object-fit : contain;
    }
    .nav__logo{
        position: fixed;
        width: 80px;
        left : 40px;
        object-fit : contain;
    }
`

const InputSearch = styled.input`
    position: fixed;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color : white;
    padding: 5px;
    border: none;
    transform: translateX(-50%, 0);

`;


export default Nav;