import React from 'react';
import RecipeHomePage from './components/RecipeHomePage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* You can add a navigation bar or header content here */}
        </header>
        <main>
          <RecipeHomePage />
        </main>
        <footer>
          {/* Optional footer */}
        </footer>
      </div>
    </Router>
  );
}

export default App;