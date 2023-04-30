import React from "react";
import { Link } from 'react-router-dom';
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
    category: '',
    gender: '',
    usage: '',
    active: false
  }

  appendItems = async () => {
    try {
      this.setState(() => ({
        loading: true
      }))

      const params = new URLSearchParams({
        page_size: PAGE_SIZE,
        page: this.state.page
      });
      if (this.state.search) { params.append('search', this.state.search); }
      if (this.state.season) { params.append('season', this.state.season); }
      if (this.state.gender) { params.append('gender', this.state.gender); }
      if (this.state.category) { params.append('category', this.state.category); }
      if (this.state.usage) { params.append('usage', this.state.usage); }

      const items = await axios.get(`${process.env.REACT_APP_API_URL}/api/item-list?${params}`,
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

  handleSearch = e => {
    if (e.key === 'Enter') {
      this.setState((prevState) => ({
        search: e.target.value,
        data: [],
        page: 0,
        active: !prevState.active 
      }), this.appendItems);
    }
  }

  handleDropdownFilterSearch = newState => {
    this.setState(() => ({
      ...newState,
      data: [],
      page: 0,
    }), this.appendItems);
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

  render() {
    const { data, error, loading } = this.state;
    console.log("count" + this.state.totalCount)
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
                      <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Season</button>                     
                      <ul className="dropdown-menu" >
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="season" onClick={() => this.handleDropdownFilterSearch({ season: "" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            All
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="season" onClick={() => this.handleDropdownFilterSearch({ season: "Spring" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            Spring
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="season" onClick={() => this.handleDropdownFilterSearch({ season: "Summer" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Summer
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="season" onClick={() => this.handleDropdownFilterSearch({ season: "Fall" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Fall
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="season" onClick={() => this.handleDropdownFilterSearch({ season: "Winter" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Winter
                          </label>
                        </div>                      
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">gender</button>                     
                      <ul className="dropdown-menu" >
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            All
                          </label>
                        </div>  
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "Men" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            Men
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "Women" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            Women
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "Boys" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Boys
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "Girls" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Girls
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" onClick={() => this.handleDropdownFilterSearch({ gender: "Unisex" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Unisex
                          </label>
                        </div>                      
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Master Category</button>                     
                      <ul className="dropdown-menu" >
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="category" onClick={() => this.handleDropdownFilterSearch({ category: "" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            All
                          </label>
                        </div>  
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="category" onClick={() => this.handleDropdownFilterSearch({ category: "Accessories" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Accessories
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="category" onClick={() => this.handleDropdownFilterSearch({ category: "Apparel" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Apparel
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="category" onClick={() => this.handleDropdownFilterSearch({ category: "Footwear" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Footwear
                          </label>
                        </div>                                          
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Usage</button>                     
                      <ul className="dropdown-menu" >
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="usage" onClick={() => this.handleDropdownFilterSearch({ usage: "" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                            All
                          </label>
                        </div>  
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="usage" onClick={() => this.handleDropdownFilterSearch({ usage: "Casual" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Casual
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="usage" onClick={() => this.handleDropdownFilterSearch({ usage: "Formal" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Formal
                          </label>
                        </div>                      
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="usage" onClick={() => this.handleDropdownFilterSearch({ usage: "Sports" })} />
                          <label className="form-check-label" for="flexRadioDefault1">
                          Sports
                          </label>
                        </div>                                          
                      </ul>
                    </li>

                  </ul>
                  <input className="form-control" type="text" placeholder="Search" aria-label="Search" style={{width:"350px"}}
                    onKeyDown={this.handleSearch}
                  />
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

          </div>
        </div>
      </div>
    );
  }
}




export default ItemList;

