import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn";
import SectionList from "./Components/SectionList";
import sections from "./Sections";
import YoutubeVid from "./Components/YoutubeVid";
import NavBar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="section" element={<SectionList sections={sections} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="youtube-help/:title" element={<YoutubeVid />} />
      </Routes>
    </>
  );
}

export default App;
