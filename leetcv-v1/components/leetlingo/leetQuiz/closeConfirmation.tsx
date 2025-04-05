const CloseConfirmation = ({
  onKeepLearning,
  onEndSession,
}: {
  onKeepLearning: () => void;
  onEndSession: () => void;
}) => {
  return (
    <div className="bg-white rounded-3xl px-5 pb-5 md:px-8 md:pb-6 w-full text-center">
      <div className="w-36 h-36 mx-auto">
        <lottie-player
          src="/assets/lottie/crying-face.json"
          speed="1"
          loop
          autoplay
        />
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-2">
        Wait, don&apos;t go! You&apos;ll lose your progress if you quit now
      </h2>
      <button
        onClick={onKeepLearning}
        className="w-full mt-6 text-white py-4 bg-indigo-500 hover:bg-indigo-600 font-bold rounded-2xl transition-colors"
      >
        KEEP LEARNING
      </button>
      <button
        onClick={onEndSession}
        className="w-full mt-4 py-2 text-red-500 hover:text-red-600 font-bold transition-colors"
      >
        END SESSION
      </button>
    </div>
  );
};

export default CloseConfirmation;
