import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.jsx";
import { Label } from "../components/ui/label.jsx";
import { useToast } from "../hooks/use-toast.js";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:8080/api";

const Voting = () => {
  const { id } = useParams(); // electionId from URL
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/elections/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setElection(res.data);
        setCandidates(res.data.candidates || []);
      } catch (err) {
        console.error("Failed to fetch election: ", err);
      }
    };

    fetchElection();
  }, [id]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      toast({
        title: "No candidate selected",
        description: "Please choose a candidate before submitting your vote.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "User not found",
        description: "You must be logged in to vote.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/votes?userId=${user.id}`,
        {
          electionId: election.id,
          candidateId: selectedCandidate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Vote Submitted",
        description: `You have successfully voted.`,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Vote submission error:", err);
      toast({
        title: "Vote Failed",
        description: err.response?.data || "Something went wrong while submitting your vote.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!election) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading election details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back to Dashboard */}
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
            <RadioGroup onValueChange={setSelectedCandidate}>
              {candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem
                    value={candidate.id.toString()}
                    id={`candidate-${candidate.id}`}
                  />
                  <Label htmlFor={`candidate-${candidate.id}`}>
                    {candidate.name} —{" "}
                    <span className="text-sm text-muted-foreground">{candidate.party}</span>
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
