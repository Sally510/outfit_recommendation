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

    const navigate = useNavigate();

    const [Item, setItem] = useState({
      loading: false,
      error: null,
      data: [],
      reviews: []
    });
    
    const { loading, error, data, review } = Item

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

    const fetchReview = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/item-list/${itemId}/reviews`, config);
        setItem({
          reviews: res.data,
          // loading: false
        })
      } catch (err) {
        setItem({
          error: err,
          // loading: false
        })
      }
    };

    useEffect(() => {
      setItem({ loading: true })
      fetchItem();
    }, []);



    return (
      <div className="container py-5">
        <Link to="/item-list" className="btn btn-light my-3">
          Go Back
        </Link>
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
                  {/* <span className="ml-2">
                    <Rating
                      value={review.rating}
                      text={`${review.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </span> */}
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

            <div className="d-grid gap-3 mt-5">
              <h4 class="mt-3">Reviews</h4>
              <div class="list-group-item">
                <strong>Sally</strong>
                <div class="rating">
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="far fa-star"></i>
                  </span>
                  <span>
                    <i class="far fa-star"></i>
                  </span>
                  <span></span>
                </div>
                <p>2023-06-16</p>
                <p>
                  goddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </p>
              </div>
            </div>
            <hr></hr>
            <div className="d-grid gap-3 mt-5">
              <h4>Write a Review</h4>
              <form className="">
                <div className="form-group">
                  <label className="form-label" for="rating">
                    Rating
                  </label>
                  <select id="rating" className="form-control">
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" for="comment">
                    Review
                  </label>
                  <textarea
                    row="5"
                    id="comment"
                    className="form-control"
                    spellcheck="false"
                  ></textarea>
                </div>
                <button type="submit" className="my-3 btn btn-primary">
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

