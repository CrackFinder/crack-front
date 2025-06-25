import { useEffect, useRef, type AllHTMLAttributes } from "react";

function Script({ onLoad, ...props }: AllHTMLAttributes<HTMLScriptElement>) {
  const ref = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    if (ref.current == null || onLoad == null) return;
    ref.current.onload = (event: Event) => {
      onLoad(event as unknown as React.SyntheticEvent<HTMLScriptElement, Event>);
    };
  }, [onLoad]);

  return <script async ref={ref} {...props}></script>;
}

export default Script;
