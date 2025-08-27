import { Route, Routes, Navigate } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Home';
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import { RaiseTicket } from './components/pages/RaiseTicket';
import { Notification } from './components/pages/Notification';
import { Tickets } from './components/pages/Tickets';
import { ViewTickets } from './components/pages/ViewTickets';
import { ImageCompressure } from './components/pages/ImageCompressure';
import { ResumeProcess } from './components/pages/ResumeProcess';

function App() {
  const { isAuth, currentUser } = useContext(DContext);

  if (isAuth === null || !currentUser) {
    return <LoadingPage />;
  }

  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        {/* Authenticated routes */}
        {/* {isAuth && ['job-seeker', 'employer'].includes(currentUser?.role) && ( */}
          <>
            <Route path="/raise-ticket" element={<RaiseTicket />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/viewtickets" element={<ViewTickets />}/>
            <Route path="/image-compressure" element={<ImageCompressure/>} />
            <Route path="/resume-process" element={<ResumeProcess/>} />
          </>
        {/* )} */}

        {/* {isAuth && ['admin'].includes(currentUser?.role) && ( */}
          <>
            <Route path="/notification" element={<Notification />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/viewtickets" element={<ViewTickets/>} />
            <Route path="/image-compressure" element={<ImageCompressure />} />
            <Route path="/resume-process" element={<ResumeProcess />} />
          </>
        {/* )} */}

        {/* Public / Default Routes */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/tickets" /> : <Home />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<LoadingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

