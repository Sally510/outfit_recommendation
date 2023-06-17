import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
  class History extends React.Component {
    state = {
      loading: false,
      error: null,
      data: []
    }

    componentDidMount() {

      this.setState({ loading: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/history`, {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
        })
        .then(res => {
          console.log(res.data.images)
          this.setState({ data: res.data.images, loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    }

    render() {  
      const {data, error, loading} = this.state;

      return (
        <div id="container">
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <section className="pt-5 pb-2 text-center container">
                <div className="col-lg-6 col-md-8 mx-auto">
                  <h1 className="fw-light">Here is your history</h1>
                </div>
              </section>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {JSON.stringify(error)}
                </div>
              )}

              {loading && (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <strong>正在加载...</strong>
                  <div
                    className="spinner-border ml-auto"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>
              )}

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {data.map((item) => {
                  return (
                    <div key={item} className="col">
                      <div className="card shadow-sm">
                        <img
                          className="card-img-top "
                          width="100%"
                          height="400"
                          src={item}
                          alt={`${item}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }




export default History;

