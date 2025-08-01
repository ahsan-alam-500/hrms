export default function App() {
  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <main className="min-h-[84vh] flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Human Resource Management System
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Empower your HR department with an all-in-one solution. Automate,
          manage, and grow.
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </main>
    </div>
  );
}
