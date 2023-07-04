import CambiarPasswordForm from "../../components/CambiarPasswordForm";
import Image from "next/image";

export default function CambiarPassword() {
  return (
    <div className="cambiar-contrasea">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
        <Image src="/images/amico.svg" className="education-amico" width={50} height={50} />
          <CambiarPasswordForm
            logoLogo="logo-2.png"
          />
        </div>
      </div>
    </div>
  )
}

