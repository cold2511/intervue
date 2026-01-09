
import { Server } from "socket.io";
import { pollService } from "../services/poll.service";

export function pollSocket(io: Server) {
  io.on("connection", (socket) => {

    socket.on("poll:fetch", async () => {
      await pollService.endPollIfExpired();
      const poll = await pollService.getActivePoll();
      socket.emit("poll:update", poll);
    });

    socket.on("teacher:createPoll", async (data) => {
      await pollService.endPollIfExpired();

      const poll = await pollService.createPoll(
        data.question,
        data.options,
        data.duration
      );

      io.emit("poll:update", poll);
    });

    socket.on("student:vote", async (data) => {
      try {
        await pollService.endPollIfExpired();

        const poll = await pollService.vote(
          data.pollId,
          data.option,
          data.studentId
        );

        io.emit("poll:update", poll);
      } catch (e: any) {
        socket.emit("student:error", e.message);
      }
    });

    socket.on("poll:history", async () => {
      const history =
        await pollService.getPollHistory();
      socket.emit("poll:history:data", history);
    });

  });
}
