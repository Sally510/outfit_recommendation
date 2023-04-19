import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
import { recommendationURL } from "../constants";
  class Recommendation extends React.Component {
    state = {
      loading: false,
      error: null,
      data: []
    }

    componentDidMount() {
      this.setState({ loading: true });
      axios
        .get(recommendationURL)
        .then(res => {
          this.setState({ data: res.data, loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    }


    render() {  
      const {data, error, loading} = this.state;

      return(
        <div id='container'> 

          <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Album example</h1>
                <p class="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <div class='mt-2'>
                  <label for="formFileLg" class="form-label">请上传您的图片</label>
                  <input class="form-control form-control-lg" id="formFileLg" type="file"/>
                </div>
              </div>
            </div>
          </section>
  
          <div class="album py-5 bg-body-tertiary">
            <div class="container">
            {error && ( <div className="alert alert-danger mt-3" role="alert">{JSON.stringify(error)}</div>)}

            {loading && (
              <div class="d-flex justify-content-center align-items-center w-100">
                <strong>正在加载...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div>
            )}

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                  <div class="card-body">
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-body-secondary">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>             
              </div>
            </div>
          </div> 
        </div>
      );
    }
  }




export default Recommendation;

