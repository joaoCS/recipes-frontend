import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CreateRecipe } from './pages/CreateRecipe';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { SavedRecipes } from './pages/SavedRecipes';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/create-recipe" element={<CreateRecipe />}/>
          <Route path="/saved-recipes" element={<SavedRecipes />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
