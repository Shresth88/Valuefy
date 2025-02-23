const virtualAssistant = (req, res) => {
  const { text } = req.body;

  let tasks = [];
  let meetingDetails = "No meeting details extracted.";
  let summary = `Summary of conversation: ${text}`;

  const taskRegex =
    /\b(?:task|tasks|action item|todo)\b\s*[:\-]?\s*(.+?)(?:\.\s*|$)/gi;
  let match;
  while ((match = taskRegex.exec(text)) !== null) {
    tasks.push(match[1].trim());
  }

  let date = "Not found";
  let time = "Not found";
  let location = "Not found";

  const dateRegex =
    /\b(?:on|by|next|this|in)\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|today|tomorrow|(?:\d+\s+days?))\b/gi;
  const timeRegex = /\b(?:at|by)\s+(\d{1,2}(:\d{2})?\s*(?:AM|PM)?)\b/gi;
  const locationRegex = /\b(?:at|in)\s+([A-Za-z\s]+)\b(?:\s|$)/gi;

  const dateMatch = text.match(dateRegex);
  const timeMatch = text.match(timeRegex);
  const locationMatch = locationRegex.exec(text);

  if (dateMatch) {
    date = dateMatch.join(", ");
  }
  if (timeMatch) {
    time = timeMatch.join(", ");
  }
  if (locationMatch) {
    location = locationMatch[1];
  }

  meetingDetails = `Date: ${date}, Time: ${time}, Location: ${location}`;

  res.json({
    tasks: tasks.length > 0 ? tasks.join(", ") : "No tasks extracted.",
    meetingDetails,
    summary,
  });
};

const recognizeVoice = (req, res) => {
  res.json({ message: "Voice recognition is not implemented yet." });
};

module.exports = {
  virtualAssistant,
  recognizeVoice,
};
