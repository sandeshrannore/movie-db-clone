import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import TrendingList from "../components/TrendingList";
type Props = {};

const HomePage = (props: Props) => {
  const navigate = useNavigate();
  const click = () => {
    navigate("/details");
  };
  return (
    <>
      <AppBar/>
      <TrendingList/>
      <button onClick={click}>Navigate</button>
    </>
  );
};

export default HomePage;
