import { LoadingSpinner } from "@/pages/main-dashboard/LoadingSpinner";
import { useMeQuery } from "@/query/meQuery";
import { useNavigate } from "react-router";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isPending, isError } = useMeQuery();

  if (isPending) return <LoadingSpinner size="xl" variant="primary" className="mx-auto mb-3" />;
  if (isError) navigate("/login");

  return children;
}

export default PrivateRoute;
