import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "white" | "glass";
  className?: string;
}

export function LoadingSpinner({ size = "md", variant = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variantClasses = {
    primary: "border-lanyard-front border-t-transparent",
    white: "border-white border-t-transparent",
    glass: "border-white/30 border-t-white/70",
  };

  return (
    <div className={cn("animate-spin rounded-full border-2", sizeClasses[size], variantClasses[variant], className)} />
  );
}

// 점 스타일 로딩 스피너
export function DotLoadingSpinner({ size = "md", variant = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  const variantClasses = {
    primary: "bg-lanyard-front",
    white: "bg-white",
    glass: "bg-white/70",
  };

  return (
    <div className={cn("flex space-x-1 justify-center", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn("rounded-full animate-pulse", sizeClasses[size], variantClasses[variant])}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}

// 펄스 스타일 로딩 스피너
export function PulseLoadingSpinner({ size = "md", variant = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variantClasses = {
    primary: "bg-lanyard-front",
    white: "bg-white",
    glass: "bg-white/50",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className={cn("absolute inset-0 rounded-full animate-ping", variantClasses[variant])} />
      <div className={cn("relative rounded-full w-full h-full", variantClasses[variant])} />
    </div>
  );
}

// 바 스타일 로딩 스피너
export function BarLoadingSpinner({ size = "md", variant = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: { width: "w-4", height: "h-2" },
    md: { width: "w-6", height: "h-3" },
    lg: { width: "w-8", height: "h-4" },
    xl: { width: "w-12", height: "h-6" },
  };

  const variantClasses = {
    primary: "bg-lanyard-front",
    white: "bg-white",
    glass: "bg-white/70",
  };

  const { width, height } = sizeClasses[size];

  return (
    <div className={cn("flex items-end space-x-1", className)}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn("rounded-sm animate-pulse", width.replace("w-", "w-1"), height, variantClasses[variant])}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1.2s",
          }}
        />
      ))}
    </div>
  );
}

// 글래스모피즘 스타일 로딩 오버레이
export function LoadingOverlay({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-lg">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <LoadingSpinner size="lg" variant="glass" className="mx-auto mb-3" />
          <p className="text-white text-sm font-medium">로딩 중...</p>
        </div>
      </div>
    </div>
  );
}
