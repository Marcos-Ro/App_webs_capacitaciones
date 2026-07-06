import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Register from "./pages/Register";
import Curses from "./pages/Curses";
import Subcurses from "./pages/Subcurses";
import Content from "./pages/Content";
import Certificate from "./pages/Certificate";
import Certificates from "./pages/Certificates";

import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import ContentManager from "./pages/admin/ContentManager";
import Questions from "./pages/admin/Questions";
import LoginAdmin from "./pages/admin/LoginAdmin";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/curses" element={<Curses />} />
        <Route path="/subcurses" element={<Subcurses />} />
        <Route path="/content" element={<Content />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/content-manager" element={<ContentManager />} />
        <Route path="/admin/questions" element={<Questions />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;