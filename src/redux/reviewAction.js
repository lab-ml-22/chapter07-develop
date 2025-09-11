import { fetchData } from '../data/mockData'

// 액션타입 정의
export const ADD_REVIEW = "ADD_REVIEW"
export const UPDATE_REVIEW = "UPDATE_REVIEW"
export const DELETE_REVIEW = "DELETE_REVIEW"
export const FETCH_REVIEWS = "FETCH_REVIEWS"
export const SET_REVIEW_FILTER = "SET_REVIEW_FILTER"
export const SET_REVIEW_LOADING = "SET_REVIEW_LOADING"

// 액션생성자들
export const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

export const fetchReviews = (reviews) => ({
    type: FETCH_REVIEWS,
    payload: reviews
})

export const setReviewFilter = (filter) => ({
    type: SET_REVIEW_FILTER,
    payload: filter
})

export const setReviewLoading = (loading) => ({
    type: SET_REVIEW_LOADING,
    payload: loading
})

// 비동기 액션들
export const fetchReviewsAsync = (productId) => {
    return async dispatch => {
        dispatch(setReviewLoading(true))
        try {
            const response = await fetchData('reviews', { productId })
            dispatch(fetchReviews(response.data))
            dispatch(setReviewLoading(false))
        } catch (error) {
            console.error('리뷰 조회 실패:', error)
            dispatch(setReviewLoading(false))
        }
    }
}

export const addReviewAsync = (reviewData) => {
    return dispatch => {
        axios.post(`${API_BASE_URL}/reviews`, reviewData)
            .then(response => {
                dispatch(addReview(response.data))
            })
            .catch(error => {
                console.error('리뷰 추가 실패:', error)
            })
    }
}

export const updateReviewAsync = (reviewId, reviewData) => {
    return dispatch => {
        axios.put(`${API_BASE_URL}/reviews/${reviewId}`, reviewData)
            .then(response => {
                dispatch(updateReview(response.data))
            })
            .catch(error => {
                console.error('리뷰 수정 실패:', error)
            })
    }
}

export const deleteReviewAsync = (reviewId) => {
    return dispatch => {
        axios.delete(`${API_BASE_URL}/reviews/${reviewId}`)
            .then(() => {
                dispatch(deleteReview(reviewId))
            })
            .catch(error => {
                console.error('리뷰 삭제 실패:', error)
            })
    }
}
