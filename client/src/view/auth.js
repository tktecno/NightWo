import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function AuthModal({ open , onClose, setUser, setRetailer }) {

  // client side

  // const [test , setTest] = useState('');
  // const navigate = useNavigate();

  // UI state
  const [isOpen, setIsOpen] = useState(open);
  const [mode, setMode] = useState("login"); // 'login' | 'signup'

  // Form state
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Keep local isOpen in sync with prop
  React.useEffect(() =>{ 
    setIsOpen(open);
  }, [open]);

  

  const reset = () => {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const closeModal = () => {
    reset();
    setIsOpen(false);
    onClose();
  };

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setSuccess("");
  };


  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Basic client-side validation
  const validate = () => {
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return "Please enter a valid email.";
    }
    if (!form.password || form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (mode === "signup") {
      if (!form.name || form.name.trim().length < 2) return "Please enter your name.";
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(form.password))
      return "Password must include uppercase, lowercase, number, and symbol";
      if (form.password !== form.confirm) return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) return setError(v);

    setLoading(true);

    try {
      const url = mode === "login" ? "/api/login" : "/api/signup";
      console.log(form);
      const res = await axios.post(`http://localhost:3000${url}`, form,{withCredentials: true});

      
      if (res.data && res.data.success) {
        setSuccess(res.data.message || "Success!");
        setTimeout(() => {
          setLoading(false);
          setUser(res.data.user);
          setRetailer(res.data?.seller || null);
          closeModal();
        }, 2000);
      } else {
        throw new Error(res.data.message || "Authentication failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Server error";
      setError(msg);
      setLoading(false);
    }
  };

  const socialLogin = (provider) => {
    alert(`Social login with ${provider} not configured. Replace this stub with real flow.`);
  };

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
        aria-hidden
      />

      {/* card */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{mode === "login" ? "Login" : "Create an account"}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* social buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => socialLogin("google")}
              className="flex-1 py-2 rounded-md border text-sm"
            >
              Continue with Google
            </button>
            <button
              onClick={() => socialLogin("github")}
              className="py-2 px-3 rounded-md border text-sm"
            >
              GitHub
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 mb-4">or</div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="block text-sm mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full input bg-gray-50 border rounded-md px-3 py-2"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full input bg-gray-50 border rounded-md px-3 py-2"
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full bg-gray-50 border rounded-md px-3 py-2 pr-12"
                  placeholder="Minimum 6 characters"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm mb-1">Confirm password</label>
                <input
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  className="w-full bg-gray-50 border rounded-md px-3 py-2"
                  placeholder="Repeat password"
                  type={showPassword ? "text" : "password"}
                />
              </div>
            )}

            {/* status */}
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <div className="flex items-center justify-between gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 rounded-md bg-emerald-600 text-white font-medium disabled:opacity-60"
              >
                {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : (mode === "login" ? "Login" : "Create account")}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            {mode === "login" ? (
              <>
                Don't have an account?{' '}
                <button className="text-emerald-600 font-medium" onClick={() => {
                  switchMode('signup');
                  }}>Sign up </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="text-emerald-600 font-medium" onClick={() => switchMode('login')}>Login</button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
