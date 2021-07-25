import React from "react";
import { useHistory } from "react-router-dom";

import "@pages/NotFoundPage/notFoundPage.scss";

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <div className="not-found-page">
      <main className="container">
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">4</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <span className="particle">0</span>
        <article className="content">
          <p>Thật sự xin lỗi!</p>
          <p>
            Bạn đã vào trang <strong>404</strong> không xác định.
          </p>
          <p>
            <button
              onClick={() => {
                history.push("/");
              }}
            >
              Trở lại trang chủ.
            </button>
          </p>
        </article>
      </main>
    </div>
  );
};

export default NotFoundPage;
