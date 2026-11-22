
import { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Classic T-Shirt', price: 8500, stock: 12 },
  { id: 2, name: 'Ladies Handbag', price: 15000, stock: 7 },
  { id: 3, name: 'Face Cream', price: 5000, stock: 4 },
]

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [sales, setSales] = useState(0)
  const [active, setActive] = useState('Dashboard')

  function recordSale(id: number) {
    const product = products.find(p => p.id === id)
    if (!product || product.stock < 1) return

    setProducts(items =>
      items.map(p => p.id === id ? { ...p, stock: p.stock - 1 } : p)
    )
    setSales(value => value + product.price)
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <h2>VendorFlow<span>AI</span></h2>
        <p className="tagline">Sell smarter. Grow faster.</p>
        {['Dashboard', 'Products', 'Sales', 'Expenses', 'Customers'].map(item => (
          <button
            className={active === item ? 'nav active' : 'nav'}
            key={item}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <section className="content">
        <header>
          <div>
            <p className="muted">BUSINESS OVERVIEW</p>
            <h1>{active}</h1>
          </div>
          <span className="avatar">VF</span>
        </header>

        <div className="welcome">
          <div>
            <p>Welcome to VendorFlow AI 👋</p>
            <h2>Manage your business with confidence.</h2>
            <span>Everything you need to track your business in one place.</span>
          </div>
        </div>

        <div className="stats">
          <article>
            <span>Total Sales Today</span>
            <h2>₦{sales.toLocaleString('en-NG')}</h2>
          </article>
          <article>
            <span>Total Products</span>
            <h2>{products.length}</h2>
          </article>
          <article>
            <span>Low Stock Items</span>
            <h2>{products.filter(p => p.stock <= 5).length}</h2>
          </article>
        </div>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Products & Inventory</h2>
              <p className="muted">Manage your available products</p>
            </div>
          </div>

          {products.map(product => (
            <div className="product" key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <p>₦{product.price.toLocaleString('en-NG')} · {product.stock} in stock</p>
              </div>
              <button
                className="sell"
                disabled={product.stock === 0}
                onClick={() => recordSale(product.id)}
              >
                Record sale
              </button>
            </div>
          ))}
        </section>

        <p className="footer">VendorFlow AI · Built for Nigerian businesses 🇳🇬</p>
      </section>
    </main>
  )
}
