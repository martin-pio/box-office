import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavList,LinkStyled } from './Navs.Styled'

const links = [
    {
        to:'/',
        text : 'Home'
    },
    {
        to:'/starred',
        text: 'Starred'
    }
]

const Nav = () => {
    const location = useLocation()
    console.log(location)
    return (
        <div>
            <NavList>
            {
                links.map(item => (
                        <li key={item.id}>
                            <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : ''}>{item.text}</LinkStyled>
                        </li>
                    ))
            }
            </NavList>
        </div>
    )
}

export default Nav
