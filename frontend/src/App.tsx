import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AdminRoute } from "@/routes/AdminRoute";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { OAuthCallback } from "@/pages/OAuthCallback";
import { Dashboard } from "@/pages/Dashboard";
import { ComingSoon } from "@/pages/ComingSoon";
import { PrepStackList } from "@/pages/PrepStackList";
import { PrepTopicTree } from "@/pages/PrepTopicTree";
import { PrepReadView } from "@/pages/PrepReadView";
import { AdminGenerateContent } from "@/pages/AdminGenerateContent";
import { NotFound } from "@/pages/NotFound";
import { Blogs } from "@/pages/Blogs";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="oauth2/callback" element={<OAuthCallback />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="prep" element={<PrepStackList />} />
                <Route path="prep/:stackSlug" element={<PrepTopicTree />} />
                <Route path="prep/:stackSlug/:topicSlug/:subtopicSlug" element={<PrepReadView />} />
                <Route path="companies" element={<ComingSoon title="Company-wise Questions" />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>

                <Route element={<AdminRoute />}>
                  <Route path="admin/content/new" element={<AdminGenerateContent />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
