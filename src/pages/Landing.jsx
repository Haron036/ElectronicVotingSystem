import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Link } from "react-router-dom";
import { Vote, Shield, Users, BarChart3, CheckCircle, Lock } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">E-VoteKE</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="hover:bg-green-600">Login</Button>
            </Link>
            <Link to="/register">
              <Button  variant="outline" className="hover:bg-green-600">Register to Vote</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-hero  py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Voice, Your Vote, Your Future
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Secure, transparent, and accessible electronic voting for all Kenyan citizens. 
            Participate in democracy from anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="outline"  className="border-primary-foreground text-primary hover:bg-green-600">
                Register as Voter
              </Button>
            </Link>
            <Link to="/results">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-green-600">
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose E-VoteKE?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge security and Kenya's administrative structure in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Bank-Grade Security</CardTitle>
                <CardDescription>
                  End-to-end encryption and blockchain-verified integrity ensure your vote is protected
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Kenya Structure</CardTitle>
                <CardDescription>
                  Organized by counties, constituencies, wards, and polling stations - just like our physical system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-info mb-4" />
                <CardTitle>Real-Time Results</CardTitle>
                <CardDescription>
                  Watch live tallies and get instant results as votes are counted transparently
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success mb-4" />
                <CardTitle>Verified Voting</CardTitle>
                <CardDescription>
                  Get a receipt to verify your vote was counted while maintaining complete anonymity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Lock className="h-12 w-12 text-warning mb-4" />
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                  Complete transparency with immutable logs that can be audited by election observers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Vote className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Accessible Anywhere</CardTitle>
                <CardDescription>
                  Vote from your phone, computer, or any internet-connected device with full accessibility support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">47</div>
              <div className="text-muted-foreground">Counties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">290</div>
              <div className="text-muted-foreground">Constituencies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">1,450</div>
              <div className="text-muted-foreground">Wards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-info mb-2">40,883</div>
              <div className="text-muted-foreground">Polling Stations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Election Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Election Types</h2>
            <p className="text-xl text-muted-foreground">
              Supporting all levels of Kenyan elections
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Vote className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Presidential</CardTitle>
                <CardDescription>
                  National presidential elections with county-by-county results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Parliamentary</CardTitle>
                <CardDescription>
                  Member of Parliament elections for all 290 constituencies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-success" />
                </div>
                <CardTitle>County</CardTitle>
                <CardDescription>
                  Governor, Senator, Women Rep, and MCA elections
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-6 w-6" />
                <span className="text-xl font-bold">E-VoteKE</span>
              </div>
              <p className="text-primary-foreground/80">
                Empowering Kenyan democracy through secure, transparent electronic voting.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/register" className="hover:text-primary-foreground">Register</Link></li>
                <li><Link to="/login" className="hover:text-primary-foreground">Login</Link></li>
                <li><Link to="/results" className="hover:text-primary-foreground">Results</Link></li>
                <li><Link to="/audit" className="hover:text-primary-foreground">Audit Trail</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground">Voter Guide</a></li>
                <li><a href="#" className="hover:text-primary-foreground">Security Info</a></li>
                <li><a href="#" className="hover:text-primary-foreground">Contact IEBC</a></li>
                <li><a href="#" className="hover:text-primary-foreground">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Status</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="border-primary-foreground text-primary-foreground">
                  System Online
                </Badge>
                <Badge variant="outline" className="border-primary-foreground text-primary-foreground">
                  Secure Connection
                </Badge>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 E-VoteKE. Built for the people of Kenya by © Aron kipkirui Ngetich.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
