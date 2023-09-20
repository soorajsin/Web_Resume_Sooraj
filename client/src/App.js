import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Register from "./Components/Account/Register";
import Login from "./Components/Account/Login";
import About from "./Components/About/About";
import Service from "./Components/Service/Service";
import Portfolio from "./Components/Portfolio/Portfolio";
import Contact from "./Components/Contact/Contact";
import Error from "./Components/Error/Error";
import Skill from "./Components/About/Skill";
import UpdateSkill from "./Components/About/UpdateSkill";
import PersonalInfo from "./Components/About/PersonalInfo";
import EditEducation from "./Components/About/EditEducation";
import Experience from "./Components/About/Experience/Experience";
import EditService from "./Components/Service/ServiceChanged/EditService";
import EditProject from "./Components/Portfolio/ChangePortfolio/EditProject";
import EditCertificate from "./Components/Portfolio/Certificate/EditCertificate";
import EditContact from "./Components/Contact/ChangeContact/EditContact";
import EditPhoto from "./Components/Home/Photo/EditPhoto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          <Route path="/skill" element={<Skill/>}/>
          <Route path="/updateSkill" element={<UpdateSkill/>}/>
          <Route path="/personalInfo" element={<PersonalInfo/>}/>
          <Route path="/editEducation" element={<EditEducation/>}/>
          <Route path="/editExperience" element={<Experience/>}/>
          <Route path="/editService" element={<EditService/>}/>
          <Route path="/editProject" element={<EditProject/>}/>
          <Route path="/editCertificate" element={<EditCertificate/>}/>
          <Route path="/editContact" element={<EditContact/>}/>
          <Route path="/editPhoto" element={<EditPhoto/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
