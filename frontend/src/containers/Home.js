import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => (
    <div className="px-4 pt-5 my-5 text-center border-bottom">
    <h1 className="display-4 fw-bold">基于用户图像输入的服装推荐系统</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">基于用户图像输入的服装推荐系统是一种智能化的应用程序，它通过分析用户上传的照片或图像，了解用户的个人特征和风格偏好，然后利用深度学习和计算机视觉技术来搜索和推荐相应的服装风格和款式。这种系统可以帮助用户更快速地找到适合自己的服装，并提高购物体验和满意度。与传统的基于关键词和标签的推荐系统相比，基于用户图像输入的服装推荐系统更能够精准地识别用户的需求和喜好，提供更加个性化的服务。</p>
      <div class="d-grid gap-2 mb-5">
        <Link to='/login' role="button" className="btn btn-dark">登录</Link>
      </div> 
    </div>
  </div>
);

export default Home;

