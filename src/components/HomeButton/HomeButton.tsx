import { Home } from "@mui/icons-material";
import homePageStyles from "../../pages/HomePage/HomePage.module.css";

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  return (
    <Home
      data-testid="home-button"
      className={homePageStyles.icon}
      onClick={onClick}
    />
  );
};

export default HomeButton;
