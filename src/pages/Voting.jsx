import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.jsx";
import { Label } from "../components/ui/label.jsx";
import toast from "react-hot-toast"; // ✅ Import toast from react-hot-toast
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Voting = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  // ✅ Remove the useToast hook
  // const { toast } = useToast();
  const navigate = useNavigate();

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

  const fetchElection = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/elections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setElection(res.data);
      setCandidates(res.data.candidates || []);
    } catch (err) {
      console.error("Failed to fetch election:", err);
    }
  };

  useEffect(() => {
    fetchElection();
  }, [id]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      // ✅ Use toast.error for validation
      toast.error("Please choose a candidate.");
      return;
    }
    if (!user) {
      // ✅ Use toast.error for authentication
      toast.error("Login required.");
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

      // ✅ Use toast.success for a successful vote
      toast.success("Vote Submitted! Your vote has been recorded.");

      await fetchElection();
      
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      console.error("Vote submission error:", err);
      // ✅ Use toast.error for a failed vote submission
      toast.error(
        err.response?.data || "Something went wrong while submitting your vote."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!election) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading election details...
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
            <RadioGroup onValueChange={setSelectedCandidate}>
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