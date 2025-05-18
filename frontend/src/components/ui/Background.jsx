const bubbles = Array.from({ length: 20 }).map(() => ({
  left: `${Math.random() * 100}vw`,
  top: `${Math.random() * 100}vh`,
  animationDelay: `${Math.random() * 10}s`,
  size: `${Math.random() * 20 + 10}px`,
}));

const Background = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800 bg-[length:400%_400%] animate-gradient overflow-hidden flex items-center justify-center z-[-1]">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/60 animate-bubble"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.animationDelay,
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default Background;
