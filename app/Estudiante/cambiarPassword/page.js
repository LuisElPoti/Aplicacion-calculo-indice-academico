import CambiarPasswordForm from "../../components/CambiarPasswordForm";
import Image from "next/image";

export default function CambiarPassword() {
  return (
    <div className="cambiar-contrasea">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
        <Image src="/images/amico.svg" className="education-amico" width={100} height={100} />
          <CambiarPasswordForm
            logoLogo="logo-2.png"
            style={{
              left: "0",
              position: "absolute",
              top: "113px",
            }}
          />
        </div>
      </div>
    </div>
  )
}

