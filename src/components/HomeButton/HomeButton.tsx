import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import homeButtonStyles from "./HomeButton.module.css";

interface HomeButtonProps {
  isHomePage?: boolean;
  formik?: any;
}

const HomeButton: React.FC<HomeButtonProps> = ({ isHomePage, formik }) => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    formik?.resetForm();
    if(isHomePage) {
      return;
    }
    navigate("/");
  };

  return (
    <Home
      data-testid="home-button"
      className={homeButtonStyles.icon}
      onClick={handleHomeButton}
    />
  );
};

export default HomeButton;
