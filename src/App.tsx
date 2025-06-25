
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Layouts
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import ClientLayout from "@/components/layouts/ClientLayout";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminAlerts from "@/pages/admin/AdminAlerts";
import AdminAIContent from "@/pages/admin/AdminAIContent";
import AdminSettings from "@/pages/admin/AdminSettings";

// Client Pages (à créer)
import ClientDashboard from "@/pages/client/ClientDashboard";
import ClientPortfolio from "@/pages/client/ClientPortfolio";
import ClientAlerts from "@/pages/client/ClientAlerts";
import ClientMarket from "@/pages/client/ClientMarket";
import ClientInsights from "@/pages/client/ClientInsights";
import ClientProfile from "@/pages/client/ClientProfile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to appropriate dashboard */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="alerts" element={<AdminAlerts />} />
              <Route path="ai-content" element={<AdminAIContent />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Client Routes */}
            <Route path="/client" element={
              <ProtectedRoute requiredRole="client">
                <ClientLayout />
              </ProtectedRoute>
            }>
              <Route index element={<ClientDashboard />} />
              <Route path="portfolio" element={<ClientPortfolio />} />
              <Route path="alerts" element={<ClientAlerts />} />
              <Route path="market" element={<ClientMarket />} />
              <Route path="insights" element={<ClientInsights />} />
              <Route path="profile" element={<ClientProfile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
