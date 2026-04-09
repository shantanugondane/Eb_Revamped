import { Navigate, Route, Routes } from 'react-router-dom'
import { BrokerLayout } from './layouts/BrokerLayout'
import { DashboardMain } from './components/dashboard/DashboardMain'
import { CreatePolicyPage } from './pages/create-policy/CreatePolicyPage'
import { LoggedOutPage } from './pages/LoggedOutPage'
import { PolicyModulePage } from './pages/PolicyModulePage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoggedOutPage />} />
      <Route element={<BrokerLayout />}>
        <Route index element={<DashboardMain />} />
        <Route path="dashboard" element={<DashboardMain />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="policies/create-policy" element={<CreatePolicyPage />} />
        <Route path="policies/:slug" element={<PolicyModulePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
