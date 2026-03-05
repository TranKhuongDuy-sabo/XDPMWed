import { useEffect, useState } from 'react';
import './index.css'; // Nhớ import file CSS vào nhé

function App() {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(response => {
        if (!response.ok) throw new Error('Không thể kết nối đến máy chủ');
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMsg(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Danh sách sản phẩm</h1>
          <span className="badge">Công nghệ</span>
        </div>

        {errorMsg && (
          <div className="error-box">
            ⚠️ <strong>Lỗi:</strong> {errorMsg}
          </div>
        )}

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="th">ID</th>
                <th className="th">Tên sản phẩm</th>
                <th className="th-right">Giá ($)</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="loading-cell">
                    <div className="spinner"></div>
                    <p style={{ marginTop: '10px', color: '#64748b' }}>Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map(product => (
                  <tr key={product.id} className="tr">
                    <td className="td-id">#{product.id}</td>
                    <td className="td-name">{product.name}</td>
                    <td className="td-price">${product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-cell">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;