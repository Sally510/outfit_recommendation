import React, { useState, useEffect  } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";

/* COMPONENTS */
import Loader from "../components/Loader";
import Message from "../components/Message";

  const Profile = () => {
    const [Item, setItem] = useState({
      loading: false,
      error: null,
      data: [],
    });

    const { loading, error, data } = Item;

    const fetchReviews = async () => {
      setItem({ loading: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews`,
          config
        );
        setItem({
          data: res.data,
          loading: false,
        });
        console.log(data);
      } catch (err) {
        setItem({
          error: err,
          loading: false,
        });
        console.log(err);
      }
    };

    const handleDeleteReview = (id) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ id });

      try {
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/reviews/delete`,
          body,
          config
        );
        window.location.reload(); 
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchReviews();
    }, []);

    return (
      <div
        className="container mx-auto"
        style={{ width: "1800px", marginTop: "50px" }}
      >
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        {data && (
          <div>
            <h2>My Reviews</h2>
            <div class="table-responsive">
              <table class="table-sm table table-striped">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr>
                        <td>{item.product_name}</td>
                        <td>{item.rating}</td>
                        <td>{item.comment}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          <Link
                            className="btn-sm btn btn-dark"
                            to={`/item-list/${item.product}`}
                          >
                            Details
                          </Link>
                        </td>
                        <td>
                          <button class="btn-sm btn btn-danger"  onClick={() =>
                                  handleDeleteReview(item.product)
                                }>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
  
export default connect(null, { })(Profile);
