import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

const PAGE_SIZE = 9;
class ItemList extends React.Component {

  state = {
    page: 0,
    search: '',
    loading: false,
    error: null,
    data: []
  }

  appendItems = async () => {
    try {
      this.setState(() => ({
        loading: true
      }));

      const items = await axios.get(`${process.env.REACT_APP_API_URL}/api/item-list?page_size=${PAGE_SIZE}&page=${this.state.page}&search=${this.state.search}`,
        {
          headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
          }
        });
      const newData = this.state.data.concat(items.data || []);

      this.setState(prevState => ({
        data: newData,
        page: prevState.page + 1
      }));
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

  handleSearch = search => {

  }

  componentDidMount() {
    this.appendItems();
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
    const { data, error, loading } = this.state;

    return (
      <div id='container'>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            {error && (<div className="alert alert-danger mt-3" role="alert">{JSON.stringify(error)}</div>)}

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
                    <Link to={`/item/${item.id}`}>
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

            <div class="d-grid gap-2 mt-3">
                <button className='btn btn-dark' onClick={() => this.appendItems()}>More</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export default ItemList;

