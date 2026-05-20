import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { TourListing } from './components/TourListing';
import { TourDetail } from './components/TourDetail';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Checkout } from './components/Checkout';
import { PaymentSuccess } from './components/PaymentSuccess';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TourManagement } from './components/admin/TourManagement';
import { CustomerSupport } from './components/admin/CustomerSupport';
import { CustomerManagement } from './components/admin/CustomerManagement';
import { InvoiceManagement } from './components/admin/InvoiceManagement';
import { RefundProcessing } from './components/admin/RefundProcessing';
import { FinancialReporting } from './components/admin/FinancialReporting';
import { EmployeeManagement } from './components/admin/EmployeeManagement';
import { ActivityLog } from './components/admin/ActivityLog';
import { AdminProfile } from './components/admin/AdminProfile';
import { GuideSchedules } from './components/admin/GuideSchedules';
import { AdminRoleSelector } from './components/AdminRoleSelector';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Favorites } from './components/Favorites';

function AppContent() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Map backend roles to frontend admin layout expected roles
  // The layout expects: 'staff' | 'accountant' | 'manager'
  const userRoleStr = localStorage.getItem('userRole') || user?.role || 'CUSTOMER';
  const rawRole = userRoleStr.toLowerCase();
  
  let layoutRole: 'staff' | 'accountant' | 'manager' | 'guide' = 'staff';
  if (rawRole === 'manager' || rawRole === 'admin') layoutRole = 'manager';
  if (rawRole === 'accountant') layoutRole = 'accountant';
  if (rawRole === 'guide') layoutRole = 'guide';
  
  const isAdminOrManager = rawRole === 'admin' || rawRole === 'manager';

  // Protect Admin Routes Component
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (rawRole === 'customer') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      {/* Debug Menu - Only show for ADMIN */}
      {isAdminOrManager && (
        isMenuOpen ? (
          <div style={{
            position: 'fixed', 
            bottom: '20px', 
            left: '20px', 
            zIndex: 9999, 
            background: 'rgba(0,0,0,0.85)', 
            padding: '15px', 
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', 
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.1)', 
            minWidth: '200px'
          }}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '5px'
            }}>
              <span style={{
                color: '#aaa', 
                fontSize: '12px', 
                textTransform: 'uppercase'
              }}>Debug Menu (Admin)</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: '#444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  width: '24px', 
                  height: '24px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
                title="Thu nhỏ menu"
              >
                ➖
              </button>
            </div>
            
            <Link 
              to="/" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '8px', 
                borderRadius: '6px', 
                background: 'rgba(255,255,255,0.1)' 
              }}
            >
              🏠 <span>Khách hàng</span>
            </Link>
            
            <Link 
              to="/admin" 
              style={{ 
                color: '#4ade80', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '8px', 
                borderRadius: '6px', 
                background: layoutRole === 'manager' ? 'rgba(74, 222, 128, 0.2)' : 'transparent' 
              }}
            >
              👮 <span>Admin Dashboard</span>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => setIsMenuOpen(true)}
            style={{
              position: 'fixed', 
              bottom: '20px', 
              left: '20px', 
              zIndex: 9999,
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)', 
              color: 'white', 
              border: 'none',
              fontSize: '20px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)', 
              transition: 'all 0.2s'
            }}
            title="Mở menu debug"
          >
            ⚙️
          </button>
        )
      )}

      <Routes>
        {/* Role Selector */}
        <Route path="/admin-select" element={<AdminRoleSelector />} />

        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/tours" element={<Layout><TourListing /></Layout>} />
        <Route path="/tour/:id" element={<Layout><TourDetail /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <AdminDashboard userRole={layoutRole} />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/tours" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <TourManagement />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/support" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <CustomerSupport />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/customers" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <CustomerManagement />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/invoices" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <InvoiceManagement />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/refunds" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <RefundProcessing />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <FinancialReporting />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/employees" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <EmployeeManagement />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/activity-log" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <ActivityLog />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/guide/schedules" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <GuideSchedules />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/profile" 
          element={
            <AdminRoute>
              <AdminLayout userRole={layoutRole}>
                <AdminProfile />
              </AdminLayout>
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}