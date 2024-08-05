import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Vehicle Transfer System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <a
          href="/drivers"
          className="flex items-center justify-center h-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg text-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition duration-300"
        >
          Drivers
        </a>
        <a
          href="/vehicles"
          className="flex items-center justify-center h-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg text-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition duration-300"
        >
          Vehicles
        </a>
        <a
          href="/transfers/create"
          className="flex items-center justify-center h-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg text-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition duration-300"
        >
          Transfer Vehicle
        </a>
        <a
          href="/transfers/history"
          className="flex items-center justify-center h-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg text-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition duration-300"
        >
          Transfer History
        </a>
      </div>
    </div>
  );
};

export default Home;
