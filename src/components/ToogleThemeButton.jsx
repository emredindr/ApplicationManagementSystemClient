import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ToogleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>{darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}</Button>
    </div>
  );
};

export default ToogleThemeButton;
