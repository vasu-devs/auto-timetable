
import Landing from "./components/pages/Landing";
import Navbar from "./components/ui/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-5xl mx-auto flex items-center flex-col py-5 border border-gray-300 text-black pt-20">
       <Landing />
      </div>
    </div>
  );
}

export default App;
