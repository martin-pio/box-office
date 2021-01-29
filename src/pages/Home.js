import React, { useState } from 'react'
import ActorGrid from '../components/actors/ActorGrid'
import MainPage from '../components/MainPage'
import { apiGet } from '../misc/apiGet'
import ShowGrid from '../components/shows/ShowGrid'

const Home = () => {
    const [input,setInput] = useState('')
    const [results,setResults] = useState(null)
    const [searchOption,setSearchOption] = useState('shows')
    
    const isShowSearch = searchOption === 'shows'

    const clickHandler = () => {
        apiGet(`/search/${searchOption}/?q=${input}`).then(result => {
            console.log(`/search/${searchOption}/?q=${input}`)
            setResults(result)
            console.log(results)
        })
    }
    const radioChange = (e) => {
        setSearchOption(e.target.value)        
        console.log(`/search/${searchOption}/?q=${input}`)
    }

    const textHandler = (e) =>{
        setInput(e.target.value )
    }
    const renderResult = () =>{
        if(results && results.length === 0){
            return <div>No results</div>
        }
        if(results && results.length > 0 ){
            return results[0].show ? 
                <ShowGrid data={results}/>
            :  
                <ActorGrid data ={results}/>
        }
        return null
    }
    return(
            <MainPage>
                <input type='text' value={input} placeholder='search something...' onChange={textHandler}></input>                
                <div>
                    <label htmlFor='show-search'>
                    shows
                    <input
                        id = 'show-search'
                        type = 'radio'
                        value = 'shows'
                        checked={isShowSearch}
                        onChange={radioChange}
                    >
                    </input>
                    </label>
                    <label htmlFor='actor-search'>
                    actors
                    <input
                        id = 'actor-search'
                        type = 'radio'
                        value = 'people'
                        checked={!isShowSearch}
                        onChange={radioChange}
                    >
                    </input>
                    </label>
                </div>
                <button type='button' onClick={()=>clickHandler()}>Fetch</button>
                {renderResult()}
            </MainPage>
    )
}

export default Home
