import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Eye, EyeOff } from "lucide-react";
import { useToast } from "../hooks/use-toast.js";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ nationalId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, {
        nationalId: formData.nationalId,
        password: formData.password,
      });

      // Save JWT + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Vote className="w-10 h-10 text-blue-600" />
          </div>
          <CardTitle className="text-center text-xl">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login with your National ID & password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>National ID</Label>
              <Input
                type="text"
                value={formData.nationalId}
                onChange={(e) =>
                  handleInputChange("nationalId", e.target.value)
                }
              />
            </div>
            <div className="mb-4 relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  handleInputChange("password", e.target.value)
                }
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
