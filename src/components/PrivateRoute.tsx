import { useMeQuery } from "@/query/meQuery";
import { useNavigate } from "react-router";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isPending, isError } = useMeQuery({ retry: false });

  if (isPending) return <div>Loading...</div>;
  if (isError) navigate("/login");

  return children;
}

export default PrivateRoute;
