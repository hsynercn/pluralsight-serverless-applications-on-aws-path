import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <Routes>
          <Route path="/page1">
          </Route>
          <Route path="/page2">
          </Route>
          <Route path="/">
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
