import React from 'react'
import { TitleWrapper } from './Title.Styled'

const Title = ({ title,subtitle }) => (
        <TitleWrapper>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
        </TitleWrapper>
)

export default Title
