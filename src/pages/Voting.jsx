import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.jsx";
import { Label } from "../components/ui/label.jsx";
import toast from "react-hot-toast";
import api from "../api.js"; // Using your configured axios instance
import { ArrowLeft } from "lucide-react";

const Voting = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for election and user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await api.get("/users/me");
        setUser(userRes.data);

        const electionRes = await api.get(`/elections/${id}`);
        setElection(electionRes.data);
        setCandidates(electionRes.data.candidates || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load election or user data");
        if (err.response?.status === 403) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          navigate("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      toast.error("Please choose a candidate.");
      return;
    }
    if (!user) {
      toast.error("Login required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/votes?userId=${user.id}`, {
        electionId: election.id,
        candidateId: selectedCandidate,
      });

      toast.success("Vote Submitted! Your vote has been recorded.");

      // Refresh election data to update vote counts
      const electionRes = await api.get(`/elections/${id}`);
      setElection(electionRes.data);
      setCandidates(electionRes.data.candidates || []);

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      console.error("Vote submission error:", err);
      toast.error(
        err.response?.data || "Something went wrong while submitting your vote."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading election details...
      </div>
    );
  }

  if (!election) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Election not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
        </div>

        <Card className="border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl">{election.title}</CardTitle>
            <p className="text-muted-foreground">{election.description}</p>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={setSelectedCandidate} value={selectedCandidate}>
              {candidates.map((c) => (
                <div key={c.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem
                    value={c.id.toString()}
                    id={`candidate-${c.id}`}
                  />
                  <Label htmlFor={`candidate-${c.id}`}>
                    {c.name} —{" "}
                    <span className="text-sm text-muted-foreground">
                      {c.party}
                    </span>{" "}
                    <span className="ml-2 text-xs text-green-600">
                      {c.votesCount} votes
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleVoteSubmit}
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Vote..." : "Submit Vote"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Voting;
