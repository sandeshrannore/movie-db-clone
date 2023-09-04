import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import ErrorPage from "../pages/ErrorPage";


type Props = {}

const AllRoutes = (props: Props) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/details" Component={DetailsPage}/>
        <Route path="*" Component={ErrorPage}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes