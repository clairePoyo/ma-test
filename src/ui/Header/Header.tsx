import logo from "../../assets/logo-meilleursagents.svg";
import Tag from "../Tag/Tag";
import Select from "../Select/Select";
import { useAppSelector } from "../../store/hooks";

const Header = () => {
  const currentRealtor = useAppSelector((state) => state.currentRealtor);

  return (
    <header className="header">
      <img src={logo} alt="meilleurs agents logo" />
      <div className="widget-wrapper">
        {currentRealtor && (
          <Tag nbUnreadMessage={currentRealtor.unread_messages} />
        )}
        <Select />
      </div>
    </header>
  );
};

export default Header;
