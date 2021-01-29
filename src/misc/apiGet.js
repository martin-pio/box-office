const FETCH_URL  = 'http://api.tvmaze.com'

export async function apiGet(searchURL){
    const response = await fetch(`${FETCH_URL}${searchURL}`).then(r=>r.json())
    return response
}
