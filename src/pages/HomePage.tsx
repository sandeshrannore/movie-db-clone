import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
type Props = {};

const HomePage = (props: Props) => {
  const navigate = useNavigate();
  const click = () => {
    navigate("/details");
  };
  return (
    <>
      <AppBar/>
      <button onClick={click}>Navigate</button>
    </>
  );
};

export default HomePage;
