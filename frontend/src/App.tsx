import { ForgotPassword } from "./components/forgotPassword"
import { Login } from "./components/login"
import { Signup } from "./components/signup"


function App() {

  return (
    <>
      {/* return <Signup onViewChange={setCurrentView} onSignup={handleSignup} /> */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Signup onViewChange={() => {}} onSignup={async () => {}} />
        <Login onViewChange={() => {}} onLogin={async () => {}} />
        <ForgotPassword onViewChange={() => {}} onForgotPassword ={async () => {}} />
      </div>
    </>
  )
}

export default App
