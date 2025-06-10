"use client";
import Navbar from "@/app/components/Navbars/Navbar-landing";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { resetPassword } from "@/app/utiils/supabase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utiils/supabase/client";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setMessage(error.message);
        toast.error(error.message);
      } else {
        setMessage("Password reset email sent successfully!");
        toast.success("Password reset email sent successfully!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
      console.error("Reset password error:", error);
    }
    setLoading(false);
  };

  // If access_token is present, user is on the reset link
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
        data: { full_name: fullName },
      });
      if (error) {
        setMessage(error.message);
        toast.error(error.message);
      } else {
        setMessage("Password updated successfully!");
        toast.success("Password updated successfully!");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-300 to-blue-500 animate-gradient-x">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/30 rounded-3xl shadow-2xl p-10 backdrop-blur-md border border-white/20 relative overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-30 rounded-full blur-2xl animate-pulse z-0" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-2xl animate-pulse z-0" />
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-blue-100 z-10 relative animate-fade-in">
            {accessToken ? "Set New Password" : "Reset Password"}
          </h2>
          {!accessToken ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 z-10 relative animate-fade-in"
            >
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-indigo-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70 text-indigo-900 placeholder-indigo-300 transition-all duration-200 shadow-sm"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handlePasswordUpdate}
              className="space-y-6 z-10 relative animate-fade-in"
            >
              <div className="mb-2">
                <label
                  htmlFor="fullName"
                  className="block text-base font-medium text-indigo-900 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70 text-indigo-900 placeholder-indigo-300 transition-all duration-200 shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="newPassword"
                  className="block text-base font-medium text-indigo-900 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70 text-indigo-900 placeholder-indigo-300 transition-all duration-200 shadow-sm"
                  placeholder="Enter your new password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          )}
          {message && (
            <div className="mt-6 text-center text-base text-indigo-900 bg-white/60 rounded-lg py-2 px-4 shadow animate-fade-in">
              {message}
            </div>
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
}
export default ResetPassword;
