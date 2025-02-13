import { FC } from "react";
import { Title, Button, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/app.store";
import Header from '../../components/header'
import ResourseList from '../../components/ResourseList'

const Landing: FC = () => {

  return (
	<>
	  <ResourseList/>
	
	  </>
   
  );
};

export default Landing;
