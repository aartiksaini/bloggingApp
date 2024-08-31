import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Post } from './pages/Post'
import { Blogs } from './pages/Blogs'
import { GenerativeAi } from './pages/Aigenerator'
import { useNavigate } from 'react-router-dom'
import { ImBlogger2 } from 'react-icons/im';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dash />} ></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="blog" element={<Blog />} />
          <Route path="/post" element={<Post />}></Route>
          <Route path="/blog/:id" element={<Blogs />} />
          <Route path="/geneartiveAi" element={<GenerativeAi></GenerativeAi>} ></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}



function Dash() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/signup');
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/src/medium_back.jpg')" }}
    >
      <ImBlogger2 className="absolute top-4 left-4 w-12 h-12 text-white" />
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4"> Your Blog, Your Voice</h1>
        <p className="text-lg text-gray-200 mb-8">
          Create, manage, and publish your blog posts with ease. Start sharing your ideas and connect with your audience today!
        </p>
        <button
          onClick={handleClick}
          className="bg-green-900 text-white text-lg font-semibold py-3 px-6 rounded-lg border-2 border-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}



export default App