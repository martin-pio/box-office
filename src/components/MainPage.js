import React from 'react'
import Nav from './Nav'
import Title from './Title'

const MainPage = ({ children }) => (
        <div>
            <Title title='BOX OFFICE' subtitle='Are you looking for a movie or an actor ?' />
            <Nav />
            {children}
        </div>
    )

export default MainPage
