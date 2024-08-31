import { Quotes } from "../components/Quotes"
// import { SigninAuth } from "../components/Authsignin"
import { SigninAuth } from "../components/Authsignin"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className='bg-green-100'>
                {/* <SigninAuth type="signin"></SigninAuth> */}
                <SigninAuth  type="signin"></SigninAuth>
            </div>
            <div className="invisible lg:visible">
                <Quotes></Quotes>
            </div>
            <div></div>
        </div>

    </div>
}