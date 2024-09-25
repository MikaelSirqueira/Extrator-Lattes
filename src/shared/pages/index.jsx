import { Outlet , useLocation} from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { Zoom } from "../components/Zoom";

export function Index() {
  const location = useLocation();

  // Verifica se a rota atual é a página de login
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {isLoginPage ?
       ( <Header isLoggedIn={false}/>)
        :
        (<Header isLoggedIn={true}/>)  
      }
      <Outlet />
      <Zoom />
      <Footer />
    </>
  )
}
