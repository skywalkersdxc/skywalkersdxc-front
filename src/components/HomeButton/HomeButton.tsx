import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import homePageStyles from "../../pages/HomePage/HomePage.module.css";

interface HomeButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      className={homePageStyles.iconButton}
      disabled={disabled}
      onClick={onClick}
      data-testid="home-button"
    >
      <Home className={homePageStyles.icon} />
    </Button>
  );
};

export default HomeButton;
