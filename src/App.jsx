import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API từ ASP.NET Core Backend
    fetch('http://trankhuongduy.somee.com/api/products') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Danh sách sản phẩm công nghệ</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá ($)</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td style={{ textAlign: 'center' }}>{product.id}</td>
                <td>{product.name}</td>
                <td style={{ textAlign: 'center' }}>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App