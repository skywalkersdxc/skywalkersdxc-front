import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import homeButtonStyles from "./HomeButton.module.css";

interface HomeButtonProps {
  isHomePage?: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({ isHomePage }) => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    if (isHomePage) {
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
