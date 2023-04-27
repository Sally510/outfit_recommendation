import React, { useState, useEffect  } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";
  const Item = () => {

    const { itemId } = useParams();

    const navigate = useNavigate();

    const [Data, setData] = useState({
      loading: false,
      error: null,
      data: []
  });

    const { loading, error, data } = Data

    useEffect(() => {
      const fetchData = async () => {
        setData({ loading: true })
        const config = { headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      } };
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/item-list/${itemId}/`, config);
          setData({
            data: res.data,
            loading: false
          })
        } catch (err) {
          setData({
            error: err,
            loading: false
          })
        }
      };
      fetchData();
    }, []);



    return(
      <div className="container py-5">
        {error && (<div className="alert alert-danger mt-3" role="alert">Login First</div>)}

        {loading && (
          <div className="d-flex justify-content-center align-items-center w-100">
            <strong>正在加载...</strong>
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        )}

      {data && (
        <div className="p-5 my-4 bg-light rounded-3 row align-items-center" >
            <div className="col-md-8">
              <h1 className="mb-3 display-5 fw-bold">{data.productDisplayName}</h1>
              <div className="fs-4  ms-2 me-5 pe-5 ">
                <div style={{ height: '70px' }}>
                  <p className="text-muted mb-4">{data.gender}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Master Category</span><span>{data.masterCategory}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Sub Category</span><span>{data.subCategory}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">usage</span><span>{data.usage}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">season</span><span>{data.season}</span>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 fs-4">
              <img src={data.image} height="500"
                className="card-img-top" alt={`${data.productDisplayName}`} />
            </div>
            
            <div className="d-grid gap-3 mt-5">
                <button className='btn btn-dark' onClick={() => navigate(-1)}>Return</button>
            </div>

        </div>
        )}
    </div>
    );
  }
  




  export default connect(null, { })(Item);

