// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import DisclaimerBanner from './components/layout/DisclaimerBanner'
import Landing    from './pages/Landing'
import Login      from './pages/Login'
import Dashboard  from './pages/Dashboard'
import Upload     from './pages/Upload'
import History    from './pages/History'
import Analytics  from './pages/Analytics'
import Dataset    from './pages/Dataset'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Landing />}  />
        <Route path="/login" element={<Login />}    />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div className="flex flex-col min-h-screen">
                <div className="sticky top-0 z-50">
                  <DisclaimerBanner />
                </div>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/upload"    element={<Upload />}    />
                  <Route path="/history"   element={<History />}   />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/dataset"   element={<Dataset />}   />
                  <Route path="*"          element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </RequireAuth>
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#161F30',
            color: '#E8F0FF',
            border: '1px solid #1E2D45',
            borderRadius: '12px',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#34D399', secondary: '#161F30' } },
          error:   { iconTheme: { primary: '#FB923C', secondary: '#161F30' } },
        }}
      />
    </BrowserRouter>
  )
}
