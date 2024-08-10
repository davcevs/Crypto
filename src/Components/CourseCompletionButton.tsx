import { useState } from "react";

const CourseCompletionButton = () => {
  const [completed, setCompleted] = useState(false);
  const [reward, setReward] = useState(null); // State for storing the rewarded item (could be an emoji, SVG, etc.)

  const handleComplete = () => {
    if (!completed) {
      // Simulating awarding a random emote
      const emotes = ["🎉", "🥳", "👏", "🌟", "💯"];
      const randomEmote = emotes[Math.floor(Math.random() * emotes.length)];
      setReward(randomEmote);
      setCompleted(true);
    }
  };

  return (
    <div className="flex items-center mt-2">
      <button
        className={`w-24 bg-${
          completed ? "green" : "gray"
        }-500 text-gray-100 hover:bg-${
          completed ? "green" : "gray"
        }-600 font-semibold py-2 px-4 rounded`}
        onClick={handleComplete}
        disabled={completed}
      >
        {completed ? "Completed" : "Not Completed"}
      </button>
      {reward && (
        <span className="ml-2 text-xl" role="img" aria-label="reward">
          {reward}
        </span>
      )}
    </div>
  );
};

export default CourseCompletionButton;
