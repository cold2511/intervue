
import { Poll } from "../models/Poll";

class PollService {

  async getActivePoll() {
    return Poll.findOne({ ended: false });
  }

  async createPoll(
    question: string,
    options: string[],
    duration: number | string
  ) {
    return Poll.create({
      question,
      options,
      duration: Number(duration),
      startTime: Date.now(),
      ended: false
    });
  }

  async vote(
    pollId: string,
    option: string,
    studentId: string
  ) {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("Poll not found");

    if (poll.votes.has(studentId)) {
      throw new Error("Already voted");
    }

    poll.votes.set(studentId, option);
    await poll.save();

    return poll;
  }

  // ✅ END POLL ONLY WHEN TIMER EXPIRES
  async endPollIfExpired() {
    const poll = await Poll.findOne({ ended: false });
    if (!poll) return;

    const elapsed =
      (Date.now() - poll.startTime) / 1000;

    if (elapsed >= poll.duration) {
      poll.ended = true;
      await poll.save();
    }
  }

  async getPollHistory() {
    return Poll.find({ ended: true })
      .sort({ startTime: -1 });
  }
}

export const pollService = new PollService();
