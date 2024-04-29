import { BrowserRouter, Routes, Route} from "react-router-dom";
import Workouts from "./pages/Workouts"
import Add from "./pages/Add"
import Update from "./pages/Update"
import Search from "./pages/Search"
import LogCalories from "./pages/logCalories"
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Workouts/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/logCalories" element={<LogCalories/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
