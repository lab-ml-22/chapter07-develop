import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsAsync, addReviewAsync, updateReviewAsync, deleteReviewAsync, setReviewFilter } from '../../redux/reviewAction'

const Review = ({ productId }) => {
    const dispatch = useDispatch()
    const { reviews, filter, loading } = useSelector(state => state.review)
    
    const [isWriting, setIsWriting] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        rating: 5,
        content: '',
        author: ''
    })

    useEffect(() => {
        console.log('Review 컴포넌트 - productId:', productId)
        if (productId) {
            dispatch(fetchReviewsAsync(productId))
        }
    }, [dispatch, productId])

    // 필터링된 리뷰 목록
    const filteredReviews = [...reviews].sort((a, b) => {
        if (filter === 'latest') {
            return new Date(b.createdAt) - new Date(a.createdAt)
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt)
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.content.trim() || !formData.author.trim()) {
            alert('내용과 작성자를 모두 입력해주세요.')
            return
        }

        const reviewData = {
            ...formData,
            productId: productId,
            createdAt: new Date().toISOString()
        }

        if (editingId) {
            dispatch(updateReviewAsync(editingId, reviewData))
            setEditingId(null)
        } else {
            dispatch(addReviewAsync(reviewData))
        }

        setFormData({
            rating: 5,
            content: '',
            author: ''
        })
        setIsWriting(false)
    }

    const handleEdit = (review) => {
        setFormData({
            rating: review.rating,
            content: review.content,
            author: review.author
        })
        setEditingId(review.id)
        setIsWriting(true)
    }

    const handleDelete = (reviewId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            dispatch(deleteReviewAsync(reviewId))
        }
    }

    const handleCancel = () => {
        setFormData({
            rating: 5,
            content: '',
            author: ''
        })
        setEditingId(null)
        setIsWriting(false)
    }

    const renderStars = (rating, interactive = false) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
                        onClick={interactive ? () => handleRatingChange(star) : undefined}
                    >
                        ★
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className="review-section">
            <div className="review-header">
                <h3>리뷰 ({reviews.length})</h3>
                <div className="review-filters">
                    <button 
                        className={filter === 'latest' ? 'active' : ''}
                        onClick={() => dispatch(setReviewFilter('latest'))}
                    >
                        최신순
                    </button>
                    <button 
                        className={filter === 'oldest' ? 'active' : ''}
                        onClick={() => dispatch(setReviewFilter('oldest'))}
                    >
                        등록순
                    </button>
                </div>
            </div>

            {!isWriting && (
                <button 
                    className="write-review-btn"
                    onClick={() => setIsWriting(true)}
                >
                    리뷰 작성하기
                </button>
            )}

            {isWriting && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <h4>{editingId ? '리뷰 수정' : '리뷰 작성'}</h4>
                    <div className="form-group">
                        <label>별점</label>
                        {renderStars(formData.rating, true)}
                    </div>
                    <div className="form-group">
                        <label>작성자</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="작성자명을 입력하세요"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>리뷰 내용</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="리뷰를 작성해주세요"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {editingId ? '수정하기' : '작성하기'}
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-btn">
                            취소
                        </button>
                    </div>
                </form>
            )}

            <div className="review-list">
                {loading ? (
                    <div className="loading">리뷰를 불러오는 중...</div>
                ) : filteredReviews.length === 0 ? (
                    <div className="no-reviews">아직 리뷰가 없습니다.</div>
                ) : (
                    filteredReviews.map(review => (
                        <div key={review.id} className="review-item">
                            <div className="review-header-item">
                                <div className="review-author">{review.author}</div>
                                <div className="review-rating">
                                    {renderStars(review.rating)}
                                </div>
                                <div className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="review-content">{review.content}</div>
                            <div className="review-actions">
                                <button 
                                    onClick={() => handleEdit(review)}
                                    className="edit-btn"
                                >
                                    수정
                                </button>
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="delete-btn"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Review
