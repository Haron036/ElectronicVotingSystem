import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api.js"; // Use configured axios instance with interceptors
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
  AlertCircle,
  Settings,
  LogOut,
  Bell,
  ArrowLeft,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import { countiesAndConstituencies } from "../data/counties.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [elections, setElections] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    county: "",
    constituency: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  // Determine initial tab from URL
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get("tab") || "elections";

  // State to control the active tab
  const [activeTab, setActiveTab] = useState(initialTab);

  const fetchData = async () => {
    try {
      const userRes = await api.get("/users/me");
      setUser(userRes.data);

      const electionsRes = await api.get("/elections");
      setElections(electionsRes.data);

      const receiptsRes = await api.get("/votes/my-votes");
      setReceipts(receiptsRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setLoading(false);

      if (err.response?.status === 403) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        navigate("/auth/login");
      } else {
        toast.error("Failed to load data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (!isEditing) {
      fetchData();

      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [navigate, isEditing]);

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        county: user.county,
        constituency: user.constituency,
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Failed to load user data.
      </div>
    );
  }
  const now = new Date();

  const activeElections = elections.filter((e) => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return now >= start && now <= end;
  });

  const upcomingElections = elections.filter((e) => {
    const start = new Date(e.startDate);
    return now < start;
  });

  const completedElections = elections.filter((e) => {
    const end = new Date(e.endDate);
    return now > end;
  });

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
    navigate("/auth/login");
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await api.put("/users/me", editForm);
      setUser(res.data);
      setEditForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        county: res.data.county,
        constituency: res.data.constituency,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold">E-VoteKE</span>
            <ReactCountryFlag
              countryCode="KE"
              svg
              style={{ width: "auto", height: "1.5rem" }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Green dot for active elections */}
              {activeElections.length > 0 && (
                <span className="absolute top-1 right-1 block w-2 h-2 bg-green-500 rounded-full"></span>
              )}

              {/* Red dot for upcoming elections */}
              {upcomingElections.length > 0 && (
                <span className="absolute top-1 right-4 block w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
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
            {user.constituency}, {user.county} County
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
                {receipts.length}
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="elections"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Elections
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Results
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="receipts"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Receipts
            </TabsTrigger>
          </TabsList>

          {/* Elections Tab */}
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

          {/* Results Tab */}

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Election Results</CardTitle>
                <CardDescription>See past election outcomes.</CardDescription>
              </CardHeader>
              <CardContent>
                {completedElections.length === 0 ? (
                  <p>No completed elections available yet.</p>
                ) : (
                  completedElections.map((election) => {
                    const hasVotes = election.candidates.some(
                      (c) => c.votesCount > 0
                    );
                    if (!hasVotes) {
                      return (
                        <div
                          key={election.id}
                          className="mb-4 p-4 border rounded"
                        >
                          <h3 className="font-semibold text-lg mb-2">
                            {election.title}
                          </h3>
                          <p>No votes have been cast for this election yet.</p>
                        </div>
                      );
                    }
                    const maxVotes = Math.max(
                      ...election.candidates.map((c) => c.votesCount)
                    );
                    return (
                      <div
                        key={election.id}
                        className="border p-4 rounded-lg shadow-sm mb-6"
                      >
                        <h3 className="font-semibold text-lg mb-2">
                          {election.title}
                        </h3>
                        <ul className="space-y-2">
                          {election.candidates.map((candidate) => (
                            <li
                              key={candidate.id}
                              className={`flex justify-between items-center border-b pb-1 ${
                                candidate.votesCount === maxVotes
                                  ? "text-green-600 font-bold"
                                  : ""
                              }`}
                            >
                              <span>{candidate.name}</span>
                              <span>{candidate.votesCount} votes</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Your voter details</CardDescription>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <>
                    <p>
                      <strong>Name:</strong> {user.firstName} {user.lastName}
                    </p>
                    <p>
                      <strong>County:</strong> {user.county}
                    </p>
                    <p>
                      <strong>Constituency:</strong> {user.constituency}
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full border rounded p-2"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) =>
                          setEditForm({ ...editForm, lastName: e.target.value })
                        }
                        className="w-full border rounded p-2"
                      />
                    </div>

                    {/* County Dropdown */}
                    <div>
                      <label className="block text-sm font-medium">
                        County
                      </label>
                      <select
                        value={editForm.county}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            county: e.target.value,
                            constituency: "", // Reset constituency
                          })
                        }
                        className="w-full border rounded p-2"
                      >
                        <option value="">Select County</option>
                        {countiesAndConstituencies.map((c) => (
                          <option key={c.county} value={c.county}>
                            {c.county}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Constituency Dropdown */}
                    <div>
                      <label className="block text-sm font-medium">
                        Constituency
                      </label>
                      <select
                        value={editForm.constituency}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            constituency: e.target.value,
                          })
                        }
                        className="w-full border rounded p-2"
                        disabled={!editForm.county}
                      >
                        <option value="">Select Constituency</option>
                        {countiesAndConstituencies
                          .find((c) => c.county === editForm.county)
                          ?.constituencies.map((constituency) => (
                            <option key={constituency} value={constituency}>
                              {constituency}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Save + Cancel */}
                    <div className="flex gap-4">
                      <Button onClick={handleProfileUpdate}>Save</Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts">
            <Card>
              <CardHeader>
                <CardTitle>Receipts</CardTitle>
                <CardDescription>Your voting history</CardDescription>
              </CardHeader>
              <CardContent>
                {receipts.length === 0 ? (
                  <p>You have not voted yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {receipts.map((receipt) => (
                      <li
                        key={receipt.id}
                        className="border-b pb-2 flex justify-between"
                      >
                        <span>
                          {receipt.electionTitle} – {receipt.candidateName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(receipt.timestamp).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
