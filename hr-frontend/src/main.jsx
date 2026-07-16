import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './routes/App.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import HomePage from './routes/HomePage.jsx'
import ApplyNow from './components/ApplyNow.jsx'
import TrackApplication from './components/TrackApplication.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import HrLogin from './components/HrLogin.jsx'
import HrDashboard from './routes/HrDashboard.jsx'
import Overview from './components/Overview.jsx'
import Applications from './components/Applications.jsx'
import ApprovedCandidates from './components/ApprovedCandidates.jsx'
import RejectedCandidates from './components/RejectedCandidates.jsx'
import ViewCandidate from './components/ViewCandidate.jsx'
import hrDashboardStore from './store/index.js'
import Feedback from './components/Feedback.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'apply-now', element: <ApplyNow /> },
      { path: 'feedback', element: <Feedback /> },
      { path: 'track-application', element: <TrackApplication /> },
      { path: 'hr-login', element: <HrLogin /> },
      { path: '*', element: <PageNotFound /> }
    ]
  },
  {
    path: '/hr-dashboard',
    element: (
      <ProtectedRoute>
        <HrDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: 'applications', element: <Applications /> },
      { path: 'approved', element: <ApprovedCandidates /> },
      { path: 'rejected', element: <RejectedCandidates /> },
      { path: 'view-candidate', element: <ViewCandidate /> },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={hrDashboardStore}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </StrictMode>,
)
