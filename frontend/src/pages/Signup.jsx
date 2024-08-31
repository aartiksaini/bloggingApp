// import { SigninAuth } from "../components/Authsignin"
import { Quotes } from "../components/Quotes"
import { Auth } from "../components/Authsignup"

export const Signup = () => {
    return <div>
        <div className="grid  grid-cols-1 lg:grid-cols-2">
            <div className="bg-green-100">
            <Auth type="signup"></Auth>
            </div>
            <div className="invisible lg:visible">
            <Quotes></Quotes>
                
            </div>
            <div></div>
        </div>

    </div>
}