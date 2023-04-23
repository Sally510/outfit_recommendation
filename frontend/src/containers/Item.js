import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
  class Recommendation extends React.Component {
    state = {
      loading: false,
      error: null,
      data: []
    }

    componentDidMount() {
        //get the id from recommendation page
        // const { id } = this.props;
        // if (id) {
        //     this.setState({ loading: true });
        //     axios
        //     .get(`${process.env.REACT_APP_API_URL}/api/item-list/${id}`)
        //     .then(res => {
        //     console.log(res.data)
        //     this.setState({ data: res.data, loading: false });
        //     })
        //     .catch(err => {
        //     this.setState({ error: err, loading: false });
        //     });
        // }
                //get the id from recommendation page
        
          this.setState({ loading: true });
          axios
          .get(`${process.env.REACT_APP_API_URL}/api/item-list/1163/`)
          .then(res => {
          console.log(res.data)
          this.setState({ data: res.data, loading: false });
          })
          .catch(err => {
          this.setState({ error: err, loading: false });
          });

      
    }

    render() {  
      const {data, error, loading} = this.state;

      return(
        <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card text-black">
              <img src={data.image} height="500"
                className="card-img-top" alt={`${data.productDisplayName}`} />
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">{data.productDisplayName}</h5>
                  <p className="text-muted mb-4">{data.gender}</p>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Master Category</span><span>{data.masterCategory}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Sub Category</span><span>{data.subCategory}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>usage</span><span>{data.usage}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>season</span><span>{data.season}</span>
                  </div>
                </div>
                <div class="d-grid gap-2">
                <button className='btn btn-dark' type='submit'>Add to wardrobe</button>
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

