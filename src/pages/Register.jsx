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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../api.js";
import { countiesAndConstituencies } from "../data/counties.js";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nationalId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    county: "",
    constituency: "",
    ward: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("You must accept the terms & conditions to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        nationalId: formData.nationalId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        county: formData.county,
        constituency: formData.constituency,
        ward: formData.ward,
        password: formData.password,
      };

      // ✅ Call backend endpoint correctly
      await registerUser(payload);

      toast.success("Registration Successful! Redirecting to login...");

      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <Vote className="w-10 h-10 text-blue-600" />
          </div>
          <CardTitle className="text-center text-xl">Create Your Account</CardTitle>
          <CardDescription className="text-center">
            Step {currentStep} of 3
          </CardDescription>
          <div className="absolute top-4 left-4">
            <Link to="/" className="flex items-center text-blue-600 hover:underline">
              ← Home
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <div className="mb-4">
                  <Label>National ID</Label>
                  <Input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange("nationalId", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <div className="mb-4">
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label>County</Label>
                  <Select
                    value={formData.county}
                    onValueChange={(value) => {
                      handleInputChange("county", value);
                      handleInputChange("constituency", "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {countiesAndConstituencies.map((c) => (
                        <SelectItem key={c.county} value={c.county}>
                          {c.county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <Label>Constituency</Label>
                  <Select
                    value={formData.constituency}
                    onValueChange={(value) => handleInputChange("constituency", value)}
                    disabled={!formData.county}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.county &&
                        countiesAndConstituencies
                          .find((c) => c.county === formData.county)
                          ?.constituencies.map((constituency) => (
                            <SelectItem key={constituency} value={constituency}>
                              {constituency}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <>
                <div className="mb-4 relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="mb-4 relative">
                  <Label>Confirm Password</Label>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                  />
                  <Label>I accept the terms & conditions</Label>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Back
                </Button>
              )}
              {currentStep < 3 && (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
              {currentStep === 3 && (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              )}
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            Already registered?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
