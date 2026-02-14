import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate } from
'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { NewsListPage } from './pages/NewsListPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminRoute } from './components/admin/AdminRoute';
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>);

}
export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <NewsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsListPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route
                  path="/admin/login"
                  element={<Navigate to="/admin" replace />} />

                <Route
                  path="/admin/dashboard"
                  element={
                  <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  } />

              </Route>
            </Routes>
          </BrowserRouter>
        </NewsProvider>
      </LanguageProvider>
    </AuthProvider>);

}