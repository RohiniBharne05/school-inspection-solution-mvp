import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SchoolPage from './pages/SchoolPage';
import InspectorPage from './pages/InspectorPage';
import ReportsPage from './pages/ReportsPage';
import PlanPage from './pages/PlanPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage';
import ChecklistPage from './pages/ChecklistPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/schools" element={<SchoolPage />} />
        <Route path="/inspectors" element={<InspectorPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
