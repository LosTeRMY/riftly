import Nav from './components/Nav';
import Home from './components/Home';
import './index.css';

export default function App() {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#131318',
      color: '#e4e1e9',
    }}>
      <Nav />
      <Home />
    </div>
  );
}
