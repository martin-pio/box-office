import React, { useState } from 'react'
import ActorGrid from '../components/actors/ActorGrid'
import MainPage from '../components/MainPage'
import { apiGet } from '../misc/apiGet'
import ShowGrid from '../components/shows/ShowGrid'
import { useLastQuery } from '../misc/custom-hooks'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.Styled'
import CustomRadio from '../components/shows/CustomRadio'

const Home = () => {
    const [input,setInput] = useLastQuery('')
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
    const onKeyDown = (e) => {
        if(e.target.value === 13){
            clickHandler()
        }
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
                <SearchInput type='text' value={input} placeholder='search something...' onKeyDown={onKeyDown} onChange={textHandler}></SearchInput>                
                <RadioInputsWrapper>
                    <div>
                        <CustomRadio
                            label='Shows'
                            id = 'shows-search'
                            value = 'shows'
                            checked = {isShowSearch}
                            onChange = {radioChange}
                        />
                    </div>
                    <div>
                        <CustomRadio
                            label='Actors'
                            id = 'actors-search'
                            value = 'people'
                            checked = {!isShowSearch}
                            onChange = {radioChange}
                        />
                    </div>
                </RadioInputsWrapper>
                <SearchButtonWrapper>
                    <button type='button' onClick={clickHandler}>Search</button>
                </SearchButtonWrapper>
                {renderResult()}
            </MainPage>
    )
}

export default Home
