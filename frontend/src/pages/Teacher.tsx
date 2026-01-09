
import { useState } from "react";
import { socket } from "../socket";
import { usePoll } from "../hooks/usePoll";
import { usePollHistory } from "../hooks/usePollHistory";

export default function Teacher() {
  const poll = usePoll();
  const history = usePollHistory();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [duration, setDuration] = useState(60);

  const createPoll = () => {
    socket.emit("teacher:createPoll", {
      question,
      options,
      duration
    });
  };

  const counts: Record<string, number> = {};
  if (poll?.votes) {
    Object.values(poll.votes).forEach(
      (opt: any) => {
        counts[opt] =
          (counts[opt] || 0) + 1;
      }
    );
  }

  const total = Object.values(counts)
    .reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher</h2>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
        />
      ))}

      <input
        type="number"
        min={10}
        value={duration}
        onChange={(e) =>
          setDuration(Number(e.target.value))
        }
      />

      <button onClick={createPoll}>
        Create Poll
      </button>

      {poll && (
        <>
          <h3>Live Results</h3>
          {Object.entries(counts).map(
            ([opt, cnt]) => (
              <p key={opt}>
                {opt}:{" "}
                {total === 0
                  ? 0
                  : Math.round(
                      (cnt / total) * 100
                    )}
                %
              </p>
            )
          )}
        </>
      )}

      <hr />
      <h3>Poll History</h3>

      {history.map((p) => {
        const res: Record<string, number> = {};
        Object.values(p.votes || {}).forEach(
          (opt: any) => {
            res[opt] =
              (res[opt] || 0) + 1;
          }
        );

        const t = Object.values(res)
          .reduce((a, b) => a + b, 0);

        return (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10
            }}
          >
            <strong>{p.question}</strong>

            {Object.entries(res).map(
              ([opt, cnt]) => (
                <p key={opt}>
                  {opt}:{" "}
                  {t === 0
                    ? 0
                    : Math.round(
                        (cnt / t) * 100
                      )}
                  %
                </p>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
