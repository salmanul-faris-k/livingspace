import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Loginpege() {
  const [loginInfo, setLoginInfo] = useState({
    login: '',
    Password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!loginInfo.login) newErrors.login = 'Email or phone is required';
    if (!loginInfo.Password) newErrors.Password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 2000);
  };
console.log(loginInfo);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Logo/Brand area */}
        <div className="text-center mb-8">
         
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-600">Sign in to your real estate account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label htmlFor="login" className="block text-sm font-semibold text-gray-700 mb-2">
                Email or Phone Number
              </label>
              <div >
                <input
                  id="login"
                  type="text"
                  value={loginInfo.login}
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, login: e.target.value.trim() });
                    if (errors.login) setErrors({ ...errors, login: '' });
                  }}
                  className={`w-full h-12 rounded-xl border-2 px-4 pr-12 transition-all duration-300 focus:outline-none bg-white/50 placeholder-gray-400 ${
                    errors.login 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 hover:border-green-300'
                  }`}
                  placeholder="Enter your email or phone"
                />
                
              </div>
              {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
            </div>
           
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginInfo.Password}
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, Password: e.target.value });
                    if (errors.Password) setErrors({ ...errors, Password: '' });
                  }}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  className={`w-full h-12 rounded-xl border-2 px-4 pr-12 transition-all duration-300 focus:outline-none bg-white/50 placeholder-gray-400 ${
                    errors.Password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 hover:border-green-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <IoMdEye/>
                  ) : (
                                       <IoMdEyeOff/>

                  )}
                </button>
              </div>
              {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password}</p>}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-end text-sm">
              
              <Link 
                to="/forgot-password" 
                className="text-green-600 hover:text-green-800 transition-colors font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
           
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:from-green-700 hover:to-emerald-800 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
        
        
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Your trusted real estate partner
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpege;