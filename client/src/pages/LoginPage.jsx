import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handlelogin = () => {
    if (email === "admin" && password === "admin") {
      navigate("/");
      login({ email: "admin", password: "admin" });
      message.success("Logged in successfully");
    } else {
      message.error("Invalid email or password");
    }
    console.log(email, password);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-[50%]">
        <div className="bg-gray-200 w-[95%] ml-auto h-full rounded-tl-full">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="h-24 pt-10"
          />
        </div>
      </div>
      <div className="w-[50%] bg-[#3E6BB4] flex items-center justify-start">
        <div className=" w-96 ml-24 h-[400px]">
          <h1 className="pl-2 mb-10 text-3xl text-white">Lets get started</h1>
          <div className="flex flex-col gap-4 mb-10 ">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              className="text-white"
              placeholder="EMAIL"
              variant="borderless"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              className="text-white"
              placeholder="PASSWORD"
              variant="borderless"
            />
          </div>
          <div className="flex items-center justify-between pl-2 ">
            <div className="text-gray-300">
              Forgot Password? <span className="text-white">Reset</span>
              <div>Register</div>
            </div>
            <Button
              onClick={handlelogin}
              className="text-blue-500 bg-white"
              size="middle"
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
          </div>
          <div>
            <Button className="w-full my-4 mx-2 text-white bg-blue-400 hover:!bg-blue-500 hover:!text-white">
              Sign in with SSO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
