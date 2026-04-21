import { Navigate, Route, Routes } from 'react-router-dom'
import { BrokerLayout } from './layouts/BrokerLayout'
import { DashboardMain } from './components/dashboard/DashboardMain'
import { CreatePolicyPage } from './pages/create-policy/CreatePolicyPage'
import { EndorsementPage } from './pages/endorsement/EndorsementPage'
import { LoggedOutPage } from './pages/LoggedOutPage'
import { ModulePage } from './pages/ModulePage'
import { EmployerPage } from './pages/employer-management/EmployerPage'
import { OnboardEmployerPage } from './pages/employer-management/OnboardEmployerPage'
import { PolicyModulePage } from './pages/PolicyModulePage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import ExecutiveDashboard from './pages/ExecutiveDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoggedOutPage />} />
      <Route element={<BrokerLayout />}>
        <Route index element={<DashboardMain />} />
        <Route path="dashboard" element={<DashboardMain />} />
        <Route path="dashboard-new" element={<ExecutiveDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="policies/create-policy" element={<CreatePolicyPage />} />
        <Route path="policies/:slug" element={<PolicyModulePage />} />
        <Route path="modules/endorsement" element={<EndorsementPage />} />
        <Route path="modules/employer" element={<EmployerPage />} />
        <Route path="modules/employer/onboard" element={<OnboardEmployerPage />} />
        <Route path="modules/:slug" element={<ModulePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
