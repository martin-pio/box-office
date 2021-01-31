import { useEffect, useReducer, useState } from "react"
import { apiGet } from "./apiGet"

function showsReducer(prevState,action) {
    switch(action.type){
        case 'ADD' :{
            return [...prevState,action.showId]
        }
        case 'REMOVE' :{
            return prevState.filter(showId => showId !== action.showId)
        }
        default : {
            return prevState
        }
    }
}

function usePersistedReducer(reducer,initialState,key) {
    const [state,dispatch] = useReducer(reducer,initialState, initial => {
        const persisted = localStorage.getItem(key)

        return persisted ? JSON.parse(persisted) : initial
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(state))
    },[state,key])

    return [state,dispatch]
}

export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key)
}
export function useLastQuery(key = 'lastQuery') {
    const [input,setInput] = useState(()=>{
        const persisted = sessionStorage.getItem(key)

        return persisted ? JSON.parse(persisted) : ''
    })

    const setPersistedInput = newState => {
        setInput(newState)
        sessionStorage.setItem(key, JSON.stringify(newState))
    }
    return [input, setPersistedInput]
}

const reducer = (prevState,action) => {
    switch (action.type){
        case 'FETCH_SUCCESS': {
            return {isLoading:false , error : null , show:action.show}
        }
        case 'FETCH_FAILURE': {
            return {...prevState, isLoading:false , error : action.error}
        }
        default :
            return prevState
    }
}

export function useShow (showId) {
    const [state,dispatch] = useReducer(
        reducer,
        {
            isLoading : true,
            error : null,
            show : null
        }
    )

    useEffect(()=>{
        let mounted = true
        apiGet(`/shows/${showId}?embed=seasons&embed=cast`)
            .then(results=> {
                if(mounted){
                    dispatch({ type: 'FETCH_SUCCESS', show : results })
                }
        }).catch(
            err => {
                if(mounted){
                    dispatch({ type: 'FETCH_FAILURE', error: err.message})
                }
            }
        )

        return () => {
            mounted=false
        }
    },[showId])
    return state
}