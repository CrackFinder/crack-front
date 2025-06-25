import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/query/loginMutation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: login } = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          setError("");
          navigate("/dashboard");
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center ">
      <div className="relative w-96 h-[32rem] mt-12">
        {/* 랜야드 끈 뒷부분 */}
        <div className="absolute bottom-[30.5rem] left-[19.0rem] -translate-x-1/2 w-[calc(6rem+2rem)] h-65 z-10">
          <div
            className="absolute bottom-0 left-0 w-10 h-full bg-lanyard-back origin-top-right"
            style={{ transform: "skewX(-15deg)" }}
          />
        </div>

        {/* 메인 로그인 카드 */}
        <div className="absolute top-0 left-0 w-full bg-form-background rounded-xl shadow-2xl pt-10 pb-10 px-10 z-20">
          <div className="relative">
            {/* 로그인 타이틀 */}
            <h1 className="text-2xl font-bold text-app-text text-center mb-8">로그인</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-app-text mb-2">
                  이메일(ID)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front py-3 text-base text-app-text"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-app-text mb-2">
                  비밀번호
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front py-3 text-base text-app-text"
                  required
                />
              </div>

              {error && <p className="text-sm text-error-text text-center font-medium">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-lanyard-front  hover:bg-lanyard-front/90 text-white rounded-md py-3 text-base font-semibold transition-colors"
              >
                로그인
              </Button>
            </form>

            <p className="mt-8 text-center text-base text-app-text">
              아직 회원가입 전이라면{" "}
              <Link
                to="/signup"
                className="font-medium text-lanyard-front hover:text-lanyard-front/80 transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>

        {/* 랜야드 끈 앞부분 */}
        <div className="absolute bottom-[calc(100%-0.75rem)] left-[50%] -translate-x-[calc(100%-0.675rem)] w-[calc(6rem+theme(spacing.8))] h-65 z-30">
          <div
            className="absolute bottom-0 left-[calc(50%-2.2rem)] w-10 h-full bg-lanyard-front origin-top-left"
            style={{ transform: "skewX(15deg)" }}
          />
        </div>

        {/* 랜야드 구멍 */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-200 rounded-sm border border-gray-300 shadow-inner z-40" />
      </div>
    </div>
  );
}
