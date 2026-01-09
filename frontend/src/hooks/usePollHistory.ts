import { useEffect, useState } from "react";
import { socket } from "../socket";

export function usePollHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    socket.emit("poll:history");

    const handler = (data: any[]) => {
      setHistory(data);
    };

    socket.on("poll:history:data", handler);

    return () => {
      socket.off("poll:history:data", handler);
    };
  }, []);

  return history;
}
