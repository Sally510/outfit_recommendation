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
      this.setState({ loading: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/recommendation/`)
        .then(res => {
          console.log(res.data)
          this.setState({ data: res.data, loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    }

    handleAddToWardrobe = slug => {
      this.setState({ loading: true });
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/add-to-wardrobe/`, {slug})
        .then(res => {
          console.log(res.data)
          this.setState({loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    }

    render() {  
      const {data, error, loading} = this.state;

      return(
        <div id='container'> 

          <section className="pt-5 pb-2 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">开始推荐</h1>
                <p className="lead text-body-secondary">请上传您的图片</p>
                <div className='mt-2'>
                  <input className="form-control form-control-lg" id="formFileLg" type="file"/>
                </div>
              </div>
            </div>
          </section>
  
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
            {error && ( <div className="alert alert-danger mt-3" role="alert">{JSON.stringify(error)}</div>)}

            {loading && (
              <div className="d-flex justify-content-center align-items-center w-100">
                <strong>正在加载...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div>
            )}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              {data.map(item => {
                return <div key={item.id} className="col" >
                <div className="card shadow-sm">
                  <img 
                    className="card-img-top " 
                    width="100%" height="400" 
                    src={item.image}
                    alt={`${item.productDisplayName}`}
                  />
                  <div className="card-body">
                    <p className="card-text">{item.productDisplayName}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={()=>this.handleAddToWardrobe(item.slug)}
                                  >加入衣橱
                          </button>
                        </div>
                        <small className="text-body-secondary">{item.gender}</small>
                      </div>
                    </div>
                  </div>
                </div>  
              })}

           
              </div>
            </div>
          </div> 
        </div>
      );
    }
  }




export default Recommendation;

