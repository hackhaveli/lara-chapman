import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Buy from './pages/Buy'
import SearchHomes from './pages/SearchHomes'
import Sell from './pages/Sell'
import Neighborhoods from './pages/Neighborhoods'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import Calculators from './pages/Calculators'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/search-homes" element={<SearchHomes />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/neighborhoods" element={<Neighborhoods />} />
          <Route path="/neighborhoods/:slug" element={<Neighborhoods />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App