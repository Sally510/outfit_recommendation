import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => (
    <div className="px-4 pt-5 my-5 text-center border-bottom">
    <h1 className="display-4 fw-bold">基于用户图像输入的服装推荐系统</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">基于用户图像输入的推荐系统是一种新兴的个性化推荐技术，其目的是根据用户上传的图像来推荐适合的商品或服务。该系统利用深度学习算法对用户图像进行分析，从中提取出关键特征，比如颜色、纹理、形状等，然后将这些特征与商品或服务的特征进行匹配，从而推荐符合用户喜好的商品或服务。</p>
      <div class="d-grid gap-2 mb-5">
        <Link to='/login' role="button" className="btn btn-dark">点击登录</Link>
      </div>
    </div>
  </div>
);

export default Home;

