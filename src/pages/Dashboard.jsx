import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  Vote,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  LogOut,
  Bell,
  ArrowLeft,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch logged-in user
        const userRes = await axios.get(
          "http://localhost:8080/api/users/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(userRes.data);

        // Fetch elections with candidates
        const electionsRes = await axios.get(
          "http://localhost:8080/api/elections",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setElections(electionsRes.data);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  const activeElections = elections.filter((e) => e.status === "ACTIVE");
  const upcomingElections = elections.filter((e) => e.status === "UPCOMING");
  const completedElections = elections.filter((e) => e.status === "COMPLETED");

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 text-white";
      case "UPCOMING":
        return "bg-yellow-500 text-white";
      case "COMPLETED":
        return "bg-gray-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "PRESIDENTIAL":
        return "bg-purple-500 text-white";
      case "PARLIAMENTARY":
        return "bg-blue-500 text-white";
      case "COUNTY":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Back to Landing
          </Button>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground">
            {user.constituency} County, {user.county} County
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Elections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
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
                {user.votesCount || 0}
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
              <div className="text-2xl font-bold text-yellow-500">
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
              <Badge className="bg-green-500 text-white">Verified</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="elections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          <TabsContent value="elections" className="space-y-6">
            {activeElections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    Active Elections
                  </CardTitle>
                  <CardDescription>
                    Elections you can vote in right now
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeElections.map((election) => (
                    <div
                      key={election.id}
                      className="border border-border rounded-lg p-4"
                    >
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
                          Voting ends:{" "}
                          {new Date(election.endDate).toLocaleString()}
                        </div>
                        <Link to={`/vote/${election.id}`}>
                          <Button className="bg-accent hover:bg-accent/90">
                            <Vote className="h-4 w-4 mr-2" />
                            Vote Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {upcomingElections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    Upcoming Elections
                  </CardTitle>
                  <CardDescription>
                    Elections scheduled for the future
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingElections.map((election) => (
                    <div
                      key={election.id}
                      className="border border-border rounded-lg p-4"
                    >
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
                        Voting starts:{" "}
                        {new Date(election.startDate).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
