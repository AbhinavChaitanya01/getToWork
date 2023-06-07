import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Login from "./components/Login";
import Signup from "./components/Signup";
import RecruiterHomePage from "./components/recruiterHomePage";
import SeekerHomePage from "./components/SeekerHomePage"
import { Toaster } from 'react-hot-toast';
import JobState from "./context/JobState";
import JobSeekerProfile from "./components/JobSeekerProfile";
import RecruiterProfile from "./components/RecruiterProfile";
import CreateJob from "./components/CreateJob";
import ViewRecruiter from "./components/ViewRecruiter";
import AllJobsCreated from "./components/AllJobsCreated";
import UpdateVacancyDetails from "./components/UpdateVacancyDetails";
import ApplyForJob from "./components/ApplyForJob";
import GetApplications from "./components/GetApplications";
import ViewCandidate from "./components/ViewCandidate";
import MyApplications from "./components/MyApplications";

function App() {
  return (
    <div className="App">
      <div>
      <Toaster position="top-center"
        toastOptions={{
          success:{
            theme:{
              primary:'#4aed88'
            }
          }
        }}/>
      </div>
      <JobState>
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<LandingPage/>}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/recruiterhomepage" element={<RecruiterHomePage />}></Route>
              <Route exact path="/seekerhomepage" element={<SeekerHomePage />}></Route>
              <Route exact path='/jobseekerprofile' element={<JobSeekerProfile/>}></Route>
              <Route exact path='/recruiterprofile' element={<RecruiterProfile/>}></Route>
              <Route exact path="/createjob" element={<CreateJob/>}></Route>
              <Route exact path="/viewrecruiter" element={<ViewRecruiter/>}></Route>
              <Route exact path="/getallcreatedjobs" element={<AllJobsCreated/>} ></Route>
              <Route exact path="/updatevacancydetails" element={<UpdateVacancyDetails/>} ></Route>
              <Route exact path="/applyforjob" element={<ApplyForJob/>} ></Route>
              <Route exact path="/recievedapplications" element={<GetApplications/>} ></Route>
              <Route exact path="/viewcandidate" element={<ViewCandidate/>} ></Route>
              <Route  exact path="/myapplications" element={<MyApplications/>}></Route>
            </Routes>
        </Router>
      </JobState>
    </div>
  );
}

export default App;
