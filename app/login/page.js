import { LoginForm } from "../components/Loginform"
import Image from 'next/image';

export default function Login() {
  return (
    <>
      <div className="login">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <Image src="/images/amico.svg" className="education-amico" width={100} height={100} />
            <LoginForm logoLogo="logo-2.png" style={{ left: "0", position: "absolute", top: "120px" }} />
          </div>
        </div>
      </div>
    </>
  )
}