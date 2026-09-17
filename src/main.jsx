import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: 2999, icon: '🎧', category: 'Audio' },
  { id: 2, name: 'Smart Watch', price: 8999, icon: '⌚', category: 'Wearables' },
  { id: 3, name: 'Portable Charger', price: 1299, icon: '🔋', category: 'Accessories' },
  { id: 4, name: 'Wireless Mouse', price: 899, icon: '🖱️', category: 'Accessories' },
  { id: 5, name: 'Mechanical Keyboard', price: 3999, icon: '⌨️', category: 'Workspace' },
  { id: 6, name: 'Webcam', price: 2199, icon: '📷', category: 'Workspace' },
  { id: 7, name: 'USB Flash Drive', price: 599, icon: '💾', category: 'Storage' },
  { id: 8, name: 'Desktop Speaker', price: 1599, icon: '🔊', category: 'Audio' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 });

function useDebouncedValue(value, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value.trim().toLowerCase()), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function Header({ query, onQueryChange, itemCount, onCartOpen }) {
  return <header className="site-header">
    <a className="brand" href="#catalog" aria-label="Premium Store home">Premium<span>Store</span></a>
    <label className="search" htmlFor="product-search">
      <span aria-hidden="true">⌕</span>
      <input id="product-search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search products" />
    </label>
    <button className="cart-trigger" type="button" onClick={onCartOpen} aria-label={`Open cart with ${itemCount} items`}>
      <span aria-hidden="true">🛒</span> Cart <span className="count">{itemCount}</span>
    </button>
  </header>;
}

function ProductGrid({ visibleProducts, onAdd, query }) {
  return <main id="catalog">
    <div className="catalog-heading">
      <div><p className="eyebrow">Curated tech</p><h1>Find your next everyday essential.</h1></div>
      <p>{visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'} found</p>
    </div>
    {visibleProducts.length ? <section className="product-grid" aria-label="Products">
      {visibleProducts.map((product) => <article className="product-card" key={product.id}>
        <div className="product-art" aria-hidden="true">{product.icon}</div>
        <p className="category">{product.category}</p>
        <h2>{product.name}</h2>
        <div className="product-footer"><strong>{currency.format(product.price)}</strong><button type="button" onClick={() => onAdd(product)}>Add to cart</button></div>
      </article>)}
    </section> : <section className="empty-results"><span aria-hidden="true">⌕</span><h2>No products found</h2><p>Try a different search than “{query}”.</p></section>}
  </main>;
}

function CartDrawer({ isOpen, cart, total, onClose, onChangeQuantity, onRequestRemove, onCheckout }) {
  return <>
    {isOpen && <button className="scrim" type="button" aria-label="Close cart" onClick={onClose} />}
    <aside className={`cart-drawer ${isOpen ? 'is-open' : ''}`} aria-label="Shopping cart" aria-hidden={!isOpen}>
      <div className="drawer-header"><div><p className="eyebrow">Your order</p><h2>Shopping cart</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close cart">×</button></div>
      <div className="cart-items">
        {cart.length ? cart.map((item) => <div className="cart-line" key={item.id}>
          <span className="cart-icon-art" aria-hidden="true">{item.icon}</span>
          <div><h3>{item.name}</h3><p>{currency.format(item.price)}</p><div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
            <button type="button" onClick={() => onChangeQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onChangeQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button>
            <button className="remove" type="button" onClick={() => onRequestRemove(item)} aria-label={`Remove ${item.name}`}>Remove</button>
          </div></div>
          <strong>{currency.format(item.price * item.quantity)}</strong>
        </div>) : <div className="empty-cart"><span aria-hidden="true">🛒</span><h3>Your cart is empty</h3><p>Add something you love to get started.</p></div>}
      </div>
      <div className="cart-summary"><div><span>Total</span><strong>{currency.format(total)}</strong></div><button type="button" disabled={!cart.length} onClick={onCheckout}>Checkout</button></div>
    </aside>
  </>;
}

function ConfirmDialog({ dialog, onCancel, onConfirm }) {
  if (!dialog) return null;
  return <div className="dialog-layer" role="presentation"><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <p className="eyebrow">Please confirm</p><h2 id="dialog-title">{dialog.title}</h2><p>{dialog.message}</p>
    <div className="dialog-actions"><button type="button" className="secondary" onClick={onCancel}>Cancel</button><button type="button" onClick={onConfirm}>{dialog.confirmLabel}</button></div>
  </section></div>;
}

function Toast({ message }) {
  return message ? <div className="toast" role="status" aria-live="polite">✓ {message}</div> : null;
}

function App() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState('');
  const debouncedQuery = useDebouncedValue(query);
  const visibleProducts = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(debouncedQuery)), [debouncedQuery]);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to your cart`);
  };
  const changeQuantity = (productId, change) => {
    const item = cart.find((entry) => entry.id === productId);
    if (!item) return;
    if (item.quantity === 1 && change < 0) return requestRemove(item);
    setCart((items) => items.map((entry) => entry.id === productId ? { ...entry, quantity: entry.quantity + change } : entry));
  };
  const requestRemove = (item) => setDialog({ type: 'remove', item, title: `Remove ${item.name}?`, message: 'This item will be removed from your shopping cart.', confirmLabel: 'Remove item' });
  const requestCheckout = () => setDialog({ type: 'checkout', title: 'Confirm checkout?', message: `Your order total is ${currency.format(total)}. This is a simulated checkout.`, confirmLabel: 'Place order' });
  const confirmDialog = () => {
    if (dialog.type === 'remove') { setCart((items) => items.filter((item) => item.id !== dialog.item.id)); setToast(`${dialog.item.name} removed from your cart`); }
    if (dialog.type === 'checkout') { setCart([]); setIsCartOpen(false); setToast('Checkout complete. Thanks for your order!'); }
    setDialog(null);
  };

  return <><Header query={query} onQueryChange={setQuery} itemCount={itemCount} onCartOpen={() => setIsCartOpen(true)} />
    <ProductGrid visibleProducts={visibleProducts} onAdd={addToCart} query={query} />
    <CartDrawer isOpen={isCartOpen} cart={cart} total={total} onClose={() => setIsCartOpen(false)} onChangeQuantity={changeQuantity} onRequestRemove={requestRemove} onCheckout={requestCheckout} />
    <ConfirmDialog dialog={dialog} onCancel={() => setDialog(null)} onConfirm={confirmDialog} /><Toast message={toast} />
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
