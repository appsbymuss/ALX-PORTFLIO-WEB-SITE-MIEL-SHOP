import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthAPI } from "../data/apiMethods";
import Googleauth from "../assets/google-auth.svg";
import Registerimage from "../assets/register-img.png"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await AuthAPI.login(email, password);
      if (response.status === 200) {
        toast.success("Login successful");
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/user-profile");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error: any) {
      console.error(`Login failed: ${error.message}`);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/user-profile", { replace: true });
    }
  }, [navigate]);

  const handleGoogleAuth = () => {
    const URL = 'https://www.lemiel.shop/auth/google';
    const redirectURL = 'lemiel.shop/auth/oauth-success'; // Expected redirect URL
    const newWindow = window.open(URL, "_blank", "width=500, height=600");

    // Poll for the child window redirect URL or closure
    const interval = setInterval(() => {
      try {
        // Check if the child window is on the expected redirect URL
        if (newWindow.location.href.startsWith(redirectURL)) {
          clearInterval(interval);
          alert("Sign-in successful!");
          newWindow.close();
          location.reload(); // Example action: Refresh the parent page
        }
      } catch (err) {
        // Ignore cross-origin errors while the child window is on a different domain
      }

      // Check if the window was closed by the user
      if (newWindow.closed) {
        clearInterval(interval);
        alert("The sign-in window was closed.");
      }
    }, 500);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FEF7F1]">
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center p-4 md:p-8">
        {/* Left Image Section */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center mb-8 md:mb-0">
          <img src={Registerimage} alt="Register" className="w-full max-w-md rounded-lg shadow-lg" style={{ height: 'calc(100% + 20px)' }} />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Connectez-vous à votre compte
            </h2>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={handleGoogleAuth}
            >
              <img src={Googleauth} alt="Google Icon" className="h-5 w-5" />
              Connectez-vous avec Google
            </button>
            <div className="flex items-center justify-center mb-4 text-sm text-gray-400">
              <span>--------- Ou utilisez votre E-mail ---------</span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="mail@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Souvenez-vous de moi</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-yellow-500 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-yellow-500 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Connexion
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-yellow-500 hover:underline">
                Inscrivez-vous ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
