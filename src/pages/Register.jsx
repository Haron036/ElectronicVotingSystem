import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast.js";

// Mock data - replace with API calls
const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale",
  "Garissa", "Moyale", "Wajir", "Marsabit", "Isiolo", "Meru", "Embu", "Nyeri"
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Your voter account has been created. Please check your email for verification.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStep1Valid = formData.nationalId && formData.firstName && formData.lastName && formData.email;
  const isStep2Valid = formData.county && formData.phone && formData.dateOfBirth;
  const isStep3Valid = formData.password && formData.confirmPassword && formData.acceptTerms;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-foreground">
            <Vote className="h-10 w-10" />
            <span className="text-3xl font-bold">E-VoteKE</span>
          </Link>
          <p className="text-primary-foreground/80 mt-2">Register to Vote</p>
        </div>

        <Card className="border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Voter Registration</CardTitle>
            <CardDescription>
              Join millions of Kenyans in shaping our democracy
            </CardDescription>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-0.5 ${
                        step < currentStep ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationalId">National ID Number *</Label>
                      <Input
                        id="nationalId"
                        type="text"
                        placeholder="12345678"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange("nationalId", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="w-full"
                    disabled={!isStep1Valid}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Location & Contact */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location & Contact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">County *</Label>
                    <Select onValueChange={(value) => handleInputChange("county", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your county" />
                      </SelectTrigger>
                      <SelectContent>
                        {counties.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="constituency">Constituency</Label>
                      <Input
                        id="constituency"
                        type="text"
                        placeholder="Your constituency"
                        value={formData.constituency}
                        onChange={(e) => handleInputChange("constituency", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ward">Ward</Label>
                      <Input
                        id="ward"
                        type="text"
                        placeholder="Your ward"
                        value={formData.ward}
                        onChange={(e) => handleInputChange("ward", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="flex-1"
                      disabled={!isStep2Valid}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                      className="mt-1"
                      required
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      I agree to the <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and{" "}
                      <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={!isStep3Valid || isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Your data is protected</p>
                  <p>All personal information is encrypted and secured according to Kenya's data protection laws.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Link 
            to="/" 
            className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
