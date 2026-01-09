
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { usePoll } from "../hooks/usePoll";
import { usePollTimer } from "../hooks/usePollTimer";

export default function Student() {
  const poll = usePoll();

  const studentId =
    sessionStorage.getItem("studentId") ||
    crypto.randomUUID();
  sessionStorage.setItem("studentId", studentId);

  const remaining = usePollTimer(
    poll?.startTime ?? 0,
    poll?.duration ?? 0
  );

  const [submitted, setSubmitted] = useState(false);

  // reset on new poll
  useEffect(() => {
    setSubmitted(false);
  }, [poll?._id]);

  if (!poll) return <p>Waiting for poll...</p>;

  const vote = (option: string) => {
    socket.emit("student:vote", {
      pollId: poll._id,
      option,
      studentId
    });
    setSubmitted(true);
  };

  const showResults =
    submitted || remaining === 0;

  const results: Record<string, number> = {};
  Object.values(poll.votes || {}).forEach(
    (opt: any) => {
      results[opt] =
        (results[opt] || 0) + 1;
    }
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Student</h2>
      <h3>{poll.question}</h3>
      <p>⏳ Time Left: {remaining}s</p>

      {!showResults ? (
        poll.options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => vote(opt)}
            style={{ display: "block", marginBottom: 10 }}
          >
            {opt}
          </button>
        ))
      ) : (
        <div>
          <h4>Results</h4>
          {Object.entries(results).map(
            ([opt, cnt]) => (
              <p key={opt}>
                {opt}: {cnt}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
