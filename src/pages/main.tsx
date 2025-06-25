import { useEffect } from "react";
import { useNavigate } from "react-router";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 안되어있을때만 로그인페이지로 이동하게.
    navigate("/login");
  }, [navigate]);

  return <div></div>;
}

export default Main;
