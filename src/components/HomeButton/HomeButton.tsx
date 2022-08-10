import { Home } from "@mui/icons-material";
import homeButtonStyles from "./HomeButton.module.css";

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  return (
    <Home
      data-testid="home-button"
      className={homeButtonStyles.icon}
      onClick={onClick}
    />
  );
};

export default HomeButton;
