import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    const links = [
        {
            id:'/',
            text : 'Home'
        },
        {
            id:'/starred',
            text: 'starred'
        }
    ]
    return (
        <div>
            {
                links.map((link)=>(
                        <div key={link.id}>
                            <Link to={link.id}>{link.text}</Link>
                        </div>
                    ))
            }
        </div>
    )
}

export default Nav
