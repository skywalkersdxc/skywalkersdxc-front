import axios from "axios";

const CancelToken = axios.CancelToken;

// This function allow you to make GET request to backend with params we need
export const getData = (params: { keyword?: string | undefined; }) => {

    // Destructuring params
    const { keyword = "" } = params;

    // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
    const searchQuery = keyword ? keyword : "a";

    // This is extra tool for cancellation request, to avoid overload API
    const source = CancelToken.source();

    // GET request with all params we need
    const out = axios.get(
        `http://localhost:3030/airports/?keyword=${searchQuery}`,
        {
            cancelToken: source.token
        }
    )

    return { out, source }
};