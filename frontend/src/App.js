import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<UserList/>}/>
        <Route path="add" element={<AddUser/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



// import UserList from "./components/UserList";

// function App() {
//   return (
//     <div>
//       <UserList/>
//     </div>
//   );
// }

// export default App;
