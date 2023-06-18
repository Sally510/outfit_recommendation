import React, { useState, useEffect  } from "react";
import {Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";

  const Profile = () => {
    return (
        <div className='container mx-auto' style={{ width: '1800px', marginTop: '50px' }}>
        {/* <div role="alert" class="fade alert alert-danger show"></div> */}
        <div class="col-md-9">
          <h2>My Orders</h2>
          <div class="table-responsive">
            <table class="table-sm table table-striped">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Created At</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>17</td>
                  <td>2023-06-15</td>
                  <td>$3244.92</td>
                  <td>$3244.92</td>
                  <td>
                    <a href="#/order/17" class="btn-sm btn btn-primary">
                      Details
                    </a>
                  </td>
                </tr>                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default connect(null, { })(Profile);

