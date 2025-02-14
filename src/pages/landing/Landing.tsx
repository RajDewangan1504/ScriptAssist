

import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import ResourseList from "../../components/ResourseList";

const Landing: FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "Planets"; // Default category

  return (
    <>
      <ResourseList category={category} />
    </>
  );
};

export default Landing;



  
