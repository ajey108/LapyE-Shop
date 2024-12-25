import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId); // Store userId in localStorage
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId); // Store userId in localStorage
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Redirect user to home
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] max-w-[500px] m-auto mt-14 mb-4 gap-4 cursor-pointer"
      method="post"
      action=""
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="parata-regular text-3xl">{currentState}</p>
        <hr className="w-8 border-none h-[1.2px] bg-gray-700" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          placeholder="Name"
          type="text"
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border border-gray-400 px-3 py-2 rounded w-full"
        placeholder="Email"
        type="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border border-gray-400 px-3 py-2 rounded w-full"
        placeholder="Password"
        type="Password"
      />
      <div className="w-full flex justify-around text-sm mt-[-8px] ">
        <p className="text-gray-400 ">Forgot your password</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign up")}>Create account</p>
        ) : (
          <p onClick={() => setCurrentState("Login")}>Login Here</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white text-xs px-10 py-4 rounded-lg"
      >
        {currentState === "Login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
