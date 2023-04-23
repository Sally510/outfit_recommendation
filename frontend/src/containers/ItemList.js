import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
  class ItemList extends React.Component {
    state = {
      loading: false,
      error: null,
      data: []
    }

    componentDidMount() {
      this.setState({ loading: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/item-list/`)
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

    handleViewItem = id => {
      //pass the id to the item page
    }

    render() {  
      const {data, error, loading} = this.state;

      return(
        <div id='container'>  
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
                          <button type="button" 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={()=>this.handleViewItem(item.id)}
                                  >View Item</button>
                          <button type="button" 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={()=>this.handleAddToWardrobe(item.slug)}
                                  >Add to Wardrobe
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




export default ItemList;
