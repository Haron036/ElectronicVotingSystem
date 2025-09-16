import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx";
import { Link } from "react-router-dom";
import { 
  Vote, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  FileText, 
  User, 
  Settings,
  LogOut,
  Bell
} from "lucide-react";

// Mock data - replace with API calls
const mockElections = [
  {
    id: 1,
    title: "2024 Presidential Election",
    type: "PRESIDENTIAL",
    status: "ACTIVE",
    startDate: "2024-08-09T06:00:00Z",
    endDate: "2024-08-09T18:00:00Z",
    description: "Choose the next President of Kenya",
    hasVoted: false,
  },
  {
    id: 2,
    title: "Nairobi County Governor",
    type: "COUNTY",
    status: "ACTIVE", 
    startDate: "2024-08-09T06:00:00Z",
    endDate: "2024-08-09T18:00:00Z",
    description: "Choose the Governor for Nairobi County",
    hasVoted: true,
  },
  {
    id: 3,
    title: "Member of Parliament - Westlands",
    type: "PARLIAMENTARY",
    status: "UPCOMING",
    startDate: "2024-08-15T06:00:00Z",
    endDate: "2024-08-15T18:00:00Z",
    description: "Choose your MP for Westlands Constituency",
    hasVoted: false,
  },
];

const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    nationalId: "12345678",
    county: "Nairobi",
    constituency: "Westlands",
    ward: "Parklands",
    votesCount: 1,
  });

  const activeElections = mockElections.filter(e => e.status === "ACTIVE");
  const upcomingElections = mockElections.filter(e => e.status === "UPCOMING");
  const completedElections = mockElections.filter(e => e.status === "COMPLETED");

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE": return "bg-success text-success-foreground";
      case "UPCOMING": return "bg-warning text-warning-foreground";
      case "COMPLETED": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "PRESIDENTIAL": return "bg-accent text-accent-foreground";
      case "PARLIAMENTARY": return "bg-secondary text-secondary-foreground";
      case "COUNTY": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">E-VoteKE</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground">
            {user.constituency} Constituency, {user.county} County
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Elections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {activeElections.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Votes Cast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {user.votesCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Elections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {upcomingElections.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Voter Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-success text-success-foreground">
                Verified
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="elections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          {/* Elections Tab */}
          <TabsContent value="elections" className="space-y-6">
            {/* Active Elections */}
            {activeElections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-success" />
                    Active Elections
                  </CardTitle>
                  <CardDescription>
                    Elections you can vote in right now
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeElections.map((election) => (
                    <div key={election.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{election.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {election.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(election.type)}>
                            {election.type}
                          </Badge>
                          <Badge className={getStatusColor(election.status)}>
                            {election.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Voting ends: {new Date(election.endDate).toLocaleString()}
                        </div>
                        {election.hasVoted ? (
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Vote Cast</span>
                          </div>
                        ) : (
                          <Link to={`/vote/${election.id}`}>
                            <Button className="bg-accent hover:bg-accent/90">
                              <Vote className="h-4 w-4 mr-2" />
                              Vote Now
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Elections */}
            {upcomingElections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Upcoming Elections
                  </CardTitle>
                  <CardDescription>
                    Elections scheduled for the future
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingElections.map((election) => (
                    <div key={election.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{election.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {election.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(election.type)}>
                            {election.type}
                          </Badge>
                          <Badge className={getStatusColor(election.status)}>
                            {election.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Voting starts: {new Date(election.startDate).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Results, Profile, Receipts Tabs */}
          {/* ...keep the rest of the JSX the same, removing TS types */}
        </Tabs>
      </div>
    </div>
  );
};

function Label({ className, children, ...props }) {
  return (
    <label className={`text-sm font-medium leading-none ${className || ""}`} {...props}>
      {children}
    </label>
  );
}

export default Dashboard;
