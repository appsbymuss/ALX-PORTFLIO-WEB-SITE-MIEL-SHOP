import { Link, useNavigate } from "react-router-dom";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import toast from "react-hot-toast";
import { AuthAPI } from "../data/apiMethods";
import Googleauth from "../assets/google-auth.svg";
import Registerimage from "../assets/register-img.png";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("Form Data:", data);

    const password = data.password as string;
    const confirmPassword = data.confirmPassword as string;

    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const requestData = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      gender: data.gender as string,
      numberPhone: data.numberPhone as string,
      email: data.email as string,
      password: data.password as string,
    };

    console.log("Request Data:", requestData);

    if (!checkRegisterFormData(requestData)) return;

    try {
      const response = await AuthAPI.signUp(
        requestData.firstName,
        requestData.lastName,
        requestData.gender,
        requestData.numberPhone,
        requestData.email,
        requestData.password
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("User registered successfully. Please confirm your account from your email.");
        navigate("/login");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error: any) {
      console.error(`Registration failed: ${error.message}`);
      if (error.response) {
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
        console.error(`Response status: ${error.response.status}`);
        console.error(`Response headers: ${JSON.stringify(error.response.headers)}`);
      }
      toast.error("Registration failed");
    }
  };

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
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Inscrivez-vous à votre compte
            </h2>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <img src={Googleauth} alt="Google Icon" className="h-5 w-5" />
              Inscrivez-vous avec Google
            </button>
            <div className="flex items-center justify-center mb-4 text-sm text-gray-400">
              <span>--------- Ou continuez avec E-mail ---------</span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                >
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                  <option value="autre">Autre</option>
                  <option value="nonSpecifiee">Non spécifiée</option>
                </select>
              </div>
              <div>
                <label htmlFor="numberPhone" className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <input
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="+212698286034"
                />
              </div>
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
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="********"
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
              Inscription
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-yellow-500 hover:underline">
                Connectez-vous ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;