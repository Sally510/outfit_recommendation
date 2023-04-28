import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

const PAGE_SIZE = 9;
class ItemList extends React.Component {

  state = {
    page: 0,
    totalCount: 0,
    search: '',
    loading: false,
    error: null,
    data: [],
    season: '',
    gender: '',
    category: '',
    usage: ''
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
        page: prevState.page + 1,
        totalCount: items.headers.totalCount
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
    console.log("count"+ this.state.totalCount)
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
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" >
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">Season</button>
                      <ul className="dropdown-menu" >
                        <li><button className="dropdown-item" onClick={ () => this.setState({season:"All"}) }>All</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({season:"Summer"}) }>Summer</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({season:"Spring"}) }>Spring</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({season:"Fall"}) }>Fall</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({season:"Winter"}) }>Winter</button></li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">Gender</button>
                      <ul className="dropdown-menu" >
                      <li><button className="dropdown-item" onClick={ () => this.setState({gender:"All"}) }>All</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({gender:"Man"}) }>Man</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({gender:"Woman"}) }>Woman</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({gender:"Boys"}) }>Boys</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({gender:"Girls"}) }>Girls</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({gender:"Unisex"}) }>Unisex</button></li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">Master Category</button>
                      <ul className="dropdown-menu" >
                        <li><button className="dropdown-item" onClick={ () => this.setState({category:"All"}) }>All</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({category:"Accessories"}) }>Accessories</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({category:"Appreal"}) }>Appreal</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({category:"Footwear"}) }>Footwear</button></li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">Usage</button>
                      <ul className="dropdown-menu" >
                        <li><button className="dropdown-item" onClick={ () => this.setState({usage:"All"}) }>All</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({usage:"Casual"}) }>Casual</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({usage:"Business"}) }>Business</button></li>
                        <li><button className="dropdown-item" onClick={ () => this.setState({usage:"Sports"}) }>Sports</button></li>
                      </ul>
                    </li>

                    </ul>
                    <form>
                      <input className="form-control" type="text" placeholder="Search" aria-label="Search"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            this.setState({ search: e.target.value });
                            this.handleSearch();  
                          }
                        }}
                      />
                    </form>
                  </div>
                </div>
              </nav>

             
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

            <div className="d-grid gap-2 mt-3">
                <button className='btn btn-dark' onClick={() => this.appendItems()}>More</button>
            </div>

            <nav aria-label="Page navigation" className="d-grid gap-2 mt-3">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
            
          </div>
        </div>
      </div>
    );
  }
}




export default ItemList;

