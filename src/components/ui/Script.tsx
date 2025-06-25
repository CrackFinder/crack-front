import { useEffect, useRef, type AllHTMLAttributes } from "react";

function Script({ onLoad, ...props }: AllHTMLAttributes<HTMLScriptElement>) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.onload = onLoad;
  }, []);

  return <script async ref={ref} {...props}></script>;
}

export default Script;
