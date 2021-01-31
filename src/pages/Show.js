import React from 'react'
import { useParams } from 'react-router-dom'
import Cast from '../components/shows/Cast'
import Details from '../components/shows/Details'
import ShowMainData from '../components/shows/ShowMainData'
import { useShow } from '../misc/custom-hooks'
import { InfoBlock, ShowPageWrapper } from './Show.Styled'

const Show = () => {
    
    const { id } =useParams()
    const { show, isLoading, error} = useShow(id)
    if(isLoading){
        return <div>Data is being loaded</div>
    }
    if(error){
        return <div>Error occured : {error}</div>
    }
    console.log(show)
    return (
        <ShowPageWrapper>
            <ShowMainData
                image={show.image}
                name = {show.name}
                rating = {show.rating}
                summary = {show.summary}
                tags = {show.genres}
            />
            <InfoBlock>
                <h2>Details</h2>
                <Details status ={show.status} network ={show.network} premiered = {show.premiered}/>
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast  cast = {show._embedded.cast}/>
            </InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show
