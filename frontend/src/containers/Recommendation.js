import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
  class Recommendation extends React.Component {
    state = {
      loading: false,
      error: null,
      file: null,
      data: [],
      
    }

    componentDidMount() {

    }

    handleFileSelect = (e) => {
      if (e.target.files.length > 0) {  
        this.setState({
          file: e.target.files[0]
        })
    }
    }

    onSubmit = async e => {
      e.preventDefault();
      this.setState({ loading: true });
      const formData = new FormData();
      formData.append("file", this.state.file);
      try {
        const res = await
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/process-recommendation`, formData, {
            headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
          });
          this.setState({ data: res.data, loading: false });

        } catch (err) {
          this.setState({ error: err, loading: false }); 
        }
    }
      
    handleAddToWardrobe = async item_id => {
      this.setState(() => ({
        loading: true
      }));
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-to-wardrobe`,
          {
            item_id
          }, {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
        });
        console.log(response.data);
        if (response.data.ok) {
          //remove the item we added to wardrobe.
          const newData = this.state.data.filter(item => item.id !== item_id);
          this.setState(() => ({
            data: newData
          }));
        }
      }
      catch (err) {
        console.error(err);
        this.setState(() => ({
          error: err
        }));
      } finally {
        this.setState(() => ({
          loading: false
        }));
      }
    }
       

    handleViewItem = id => {
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
                 
                  
                    <form onSubmit={this.onSubmit}>
                      <input className="form-control form-control-lg" onChange={this.handleFileSelect}   id="id_docfile" type="file" name="docfile" accept="image/*" />
                      <div class="d-grid gap-2 mt-3">
                      <button className='btn btn-dark' >Submit</button>
                      </div>
                    </form>                 
                
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
                  <Link to={`/item-list/${item.id}`}>
                      <img
                        className="card-img-top "
                        width="100%" height="400"
                        src={item.image}
                        alt={`${item.productDisplayName}`}
                      />
                    </Link>
                    <div className="card-body">
                      <p className="card-text" style={{ height: '60px' }}>{item.productDisplayName}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => this.handleAddToWardrobe(item.id)}
                        >Add to Wardrobe
                        </button>
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

