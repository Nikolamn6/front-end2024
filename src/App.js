import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/default/Footer';
import Header from './components/default/Header';
import ScrollUp from './components/default/ScrollUp';
import Index from './pages/default/Index/Index';
import Blog from './pages/default/Blog/Blog';
import SignIn from './pages/default/SignIn/SignIn';
import SignUp from './pages/default/SignUp/SignUp';
import Sidebar from './components/logged/Sidebar';
import HeaderLogged from './components/logged/Header';
import Chat from './pages/logged/Chat/Chat';
import Tasks from './pages/logged/Tasks/Tasks';
import Calendar from './pages/logged/Calendar/Events/Calendar';
import CreateEvent from './pages/logged/Calendar/CreateEvent/CreateEvent';
import Profile from './pages/logged/Profile/Profile';
import Diet from './pages/logged/Fitness/Diet/Diet';
import Password from './pages/default/SignIn/Password';
import { MenuContext } from './contexts/MenuContext';
import UpdateProfile from './pages/logged/Profile/UpdateProfile';
import Recovery from './pages/default/Recovery/Recovery';
import Reset from './pages/default/Reset/Reset';
import Transformations from './pages/default/Transformations/Transformations';
import Gallery from './pages/logged/Fitness/Gallery/Gallery';
import Programs from './pages/logged/Fitness/Programs/Programs';

import IndexLogged from './pages/logged/Index/IndexLogged';
//const DefaultLayout = lazy(() => import('./pages/Layout/DefaultLayout'));

import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import CreateBlog from './pages/logged/Blog/CreateBlog';


function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");

  const token = localStorage.getItem('token');

  // const [menu, setMenu] = useState(() => {
  //   const type = localStorage.getItem("menuType");
  //   return type || "";
  // });

  const [menu, setMenu] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="App bg-[#FCFCFC] dark:bg-black">

      <MenuContext.Provider value={{ menu, setMenu }}>
          {token || menu ? "" : <Header /> }

      <ScrollUp />

      {/* {token ? ( */}

          <div className={token || menu ? "dark:bg-boxdark-2 dark:text-bodydark" : ""}>

          <div className={token || menu ? "flex h-screen overflow-hidden" : ""}>

          {token ? <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> : ""}
      
      
      
            <div className={token || menu ? "relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden" : ""}>

            {token ? <HeaderLogged sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> : ""}
      
      
      
              <main>
                <div className={token || menu ? "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" : ""}>
                  {/* <Outlet /> */}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/recovery" element={<Recovery />} />
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/transformations" element={<Transformations />} />
                    <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />

                    <Route path="/chat" element={<AuthorizeUser> <Chat /> </AuthorizeUser>}/>
                    <Route path="/lIndex" element={<AuthorizeUser> <IndexLogged /> </AuthorizeUser>}/>
                    <Route path="/blog" element={ <Blog /> }/>
                    <Route path="/tasks" element={<AuthorizeUser> <Tasks /> </AuthorizeUser>}/>
                    <Route path="/events/events" element={<AuthorizeUser> <Calendar /> </AuthorizeUser>}/>
                    <Route path="/events/addEvent" element={<AuthorizeUser> <CreateEvent /> </AuthorizeUser>}/>
                    <Route path="/fitness/diets" element={<AuthorizeUser> <Diet /> </AuthorizeUser>}/>
                    <Route path="/profile" element={<AuthorizeUser> <Profile /> </AuthorizeUser>}/>
                    <Route path="/profile/edit" element={<AuthorizeUser> <UpdateProfile /> </AuthorizeUser>}/>
                    <Route path="/addBlog" element={<AuthorizeUser> <CreateBlog /> </AuthorizeUser>}/>
                    <Route path="fitness/gallery" element={<AuthorizeUser> <Gallery /> </AuthorizeUser>}/>
                    <Route path="fitness/programs" element={<AuthorizeUser> <Programs /> </AuthorizeUser>}/>

                  </Routes>
                </div>
              </main>
      
            </div>
      
          </div>
      
        </div>
      {/* ) : (
        <Routes>
        <Route path="/" element={<Index />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
      <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>}/>
      <Route path="/profile/edit" element={<UpdateProfile />}/>
        </Routes>
      )} */}

      {token ? "" : <Footer /> }

      </MenuContext.Provider>
    </div>
  );
}

export default App;
