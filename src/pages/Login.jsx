import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Vote, Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "../hooks/use-toast.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ nationalId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard...",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-foreground">
            <Vote className="h-10 w-10" />
            <span className="text-3xl font-bold">E-VoteKE</span>
          </Link>
          <p className="text-primary-foreground/80 mt-2">Secure Electronic Voting</p>
        </div>

        <Card className="border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your voter account to participate in elections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nationalId">National ID Number</Label>
                <Input
                  id="nationalId"
                  type="text"
                  placeholder="Enter your National ID"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange("nationalId", e.target.value)}
                  required
                  className="transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="pr-10 transition-colors"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <Link to="/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
                Forgot your password?
              </Link>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New voter?</span>
                </div>
              </div>

              <Link to="/register">
                <Button variant="outline" className="w-full">Register to Vote</Button>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Your security is our priority</p>
                  <p>All communications are encrypted and your vote remains anonymous.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
