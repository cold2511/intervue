
import { useEffect, useState } from "react";
import { socket } from "../socket";

export function usePoll() {
  const [poll, setPoll] = useState<any>(null);

  useEffect(() => {
    socket.emit("poll:fetch");

    const handler = (data: any) => {
      setPoll(data);
    };

    socket.on("poll:update", handler);

    return () => {
      socket.off("poll:update", handler);
    };
  }, []);

  return poll;
}
