const initialState = {
    reviews: [],
    filter: 'latest', // 'latest' 또는 'oldest'
    loading: false
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_REVIEWS":
            return {
                ...state,
                reviews: action.payload
            }
        case "ADD_REVIEW":
            return {
                ...state,
                reviews: [...state.reviews, action.payload]
            }
        case "UPDATE_REVIEW":
            return {
                ...state,
                reviews: state.reviews.map(review => 
                    review.id === action.payload.id ? action.payload : review
                )
            }
        case "DELETE_REVIEW":
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.payload)
            }
        case "SET_REVIEW_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        case "SET_REVIEW_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default reviewReducer
