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

// Admin imports
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminNeighborhoods from './pages/admin/AdminNeighborhoods'
import NeighborhoodForm from './pages/admin/NeighborhoodForm'
import AdminBuySell from './pages/admin/AdminBuySell'
import AdminGeneral from './pages/admin/AdminGeneral'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - Outside main Layout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="neighborhoods" element={<AdminNeighborhoods />} />
          <Route path="neighborhoods/new" element={<NeighborhoodForm />} />
          <Route path="neighborhoods/edit/:id" element={<NeighborhoodForm />} />
          <Route path="buy-sell" element={<AdminBuySell />} />
          <Route path="general" element={<AdminGeneral />} />
        </Route>

        {/* Public Routes - With main Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/buy" element={<Layout><Buy /></Layout>} />
        <Route path="/search-homes" element={<Layout><SearchHomes /></Layout>} />
        <Route path="/sell" element={<Layout><Sell /></Layout>} />
        <Route path="/neighborhoods" element={<Layout><Neighborhoods /></Layout>} />
        <Route path="/neighborhoods/:slug" element={<Layout><Neighborhoods /></Layout>} />
        <Route path="/calculators" element={<Layout><Calculators /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App