export default function AboutPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center space-y-6 w-full max-w-full-xl px-6"> 
        <h1 className="text-5xl font-bold text-white tracking-wide transform transition-transform duration-300 hover:scale-105">
          Welcome to Fun, Functional Learning!
        </h1>
        <p className="text-xl text-white opacity-80">
          Embrace the excitement of learning through engaging challenges, smooth interactions, and modern design. Let’s dive into fun and discover new things together!
        </p>
        <button
          className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-200 transform hover:scale-105"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
