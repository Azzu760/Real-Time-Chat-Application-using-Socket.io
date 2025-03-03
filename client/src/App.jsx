import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chatContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/chat" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/chat"
          element={user ? <ChatRoom /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<Navigate to={user ? "/chat" : "/"} />} />
      </Routes>
    </ChatContextProvider>
  );
}

export default App;
