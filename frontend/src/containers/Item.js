import React, { useState, useEffect  } from "react";
import {Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";

/* COMPONENTS */
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

  const Item = () => {

    const { itemId } = useParams();

    const [Item, setItem] = useState({
      loading: false,
      error: null,
      data: [],
    });
    
    const { loading, error, data } = Item

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewMessage, setReviewMessage] = useState(null);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const navigate = useNavigate();

    const fetchItem = async () => {
      setItem({ loading: true })
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/item-list/${itemId}/`, config);
        setItem({
          data: res.data,
          loading: false
        })
      } catch (err) {
        setItem({
          error: err,
          loading: false
        })
      }
    };

    const createProductReview = async (itemId, review) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/item-list/${itemId}/reviews/`, review, config);
        setReviewSubmitted(true);
        window.location.reload(); 
      } catch (err) {
        console.log(err.response.data)
        if (err.response.data.detail === "Product already reviewed") {
          setReviewMessage("You have already reviewed this product."); 
        } else if (err.response.data.detail === "Please Select a rating") {
          setReviewMessage("Please Select a rating.");
        }
        setReviewSubmitted(false)
      }
    };

    const submitHandler = (e) => {
      e.preventDefault();
      createProductReview(itemId, { rating, comment });
      // setReviewSubmitted(true);    
    } 

    useEffect(() => {
      if (reviewSubmitted) {
        setRating(0);
        setComment("");
      }
      fetchItem();
    }, []);



    return (
      <div className="container py-5">
        <button onClick={() => navigate(-1)} className="btn btn-light my-3">
          Go Back
        </button>
        
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        {data && (
          <div className="p-5 my-4 bg-light rounded-3 row align-items-center">
            <div className="col-md-8">
              <h1 className="mb-3 display-5 fw-bold">
                {data.product_display_name}
              </h1>
              <div className="fs-4  ms-2 me-5 pe-5 ">
                <div
                  className="d-flex mb-4"
                  style={{ height: "70px", justifyContent: "space-between" }}
                >
                  <span className="text-muted">{data.gender}</span>
                  <span className="ml-2">
                    <Rating
                      value={data.rating}
                      text={`${data.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Master Category</span>
                  <span>{data.master_category}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Sub Category</span>
                  <span>{data.sub_category}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">usage</span>
                  <span>{data.usage}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">season</span>
                  <span>{data.season}</span>
                </div>
              </div>
            </div>

            <div className="col-md-4 fs-4">
              <img
                src={data.image}
                height="500"
                className="card-img-top"
                alt={`${data.data_display_name}`}
              />
            </div>

            {data.reviews && (
              <div className="d-grid gap-3 mt-5">
                <h4 className="mt-3">Reviews</h4>
                {data.reviews.length === 0 && (
                  <Message variant="info">No Reviews</Message>
                )}

                <div>
                  {data.reviews.map((review) => (
                    <div key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="f8e825" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr></hr>

            <div className="d-grid gap-3 mt-3">
              <h4>Write a Review</h4>
              { reviewSubmitted && (
                <Message variant="success">Review Submitted</Message>
              )}
              {reviewMessage && (
                <Message variant="danger">{reviewMessage}</Message>
              )}
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label className="form-label" >
                    Rating
                  </label>
                  <select
                    id="rating"
                    className="form-control"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Review
                  </label>
                  <textarea
                    row="5"
                    id="comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="my-3 btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default connect(null, { })(Item);

