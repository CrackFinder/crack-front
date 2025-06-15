import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function RegisterForm() {
  const [modelName, setModelName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [ssid, setSsid] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!busNumber.trim()) {
      setError("예외 : 버스번호를 입력해 주세요");
      return;
    }

    if (!modelName.trim()) {
      setError("예외 : 기기번호(모델명)를 입력해 주세요");
      return;
    }

    if (!ssid.trim()) {
      setError("예외 : 기기 SSID를 입력해 주세요");
      return;
    }

    setError("");
    alert("기기 등록 성공!");
    console.log("등록 정보:", { modelName, busNumber, ssid });
  };

  return (
    <div className="p-6">
      {/* 헤더 섹션 */}
      <div className="bg-lanyard-front rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <div className="text-sm opacity-80">로고(생긴다면)</div>
            </div>
            <div className="text-white">
              <h2 className="text-lg font-semibold">관리자 이름</h2>
              <p className="text-sm opacity-80">정보들..</p>
            </div>
          </div>
        </div>
      </div>

      {/* 관리 기기 목록 (간단 버전) */}
      <Card className="bg-form-background shadow-lg mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-app-text">관리 기기</h2>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>목록으로</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-app-text">CF-111</span>
              <span className="text-app-text/60">19개</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-app-text">CF-123</span>
              <span className="text-app-text/60">1개</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 기기 등록 폼 */}
      <Card className="bg-form-background shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-lanyard-front text-center mb-8">기기 등록</h1>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label htmlFor="modelName" className="block text-sm font-medium text-app-text mb-2">
                기기번호(모델명)
              </label>
              <Input
                id="modelName"
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="CF-111"
                className="rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front py-3 text-base text-app-text"
                required
              />
            </div>

            <div>
              <label htmlFor="busNumber" className="block text-sm font-medium text-app-text mb-2">
                버스번호
              </label>
              <Input
                id="busNumber"
                type="text"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                placeholder="버스번호를 입력하세요"
                className="rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front py-3 text-base text-app-text"
                required
              />
            </div>

            <div>
              <label htmlFor="ssid" className="block text-sm font-medium text-app-text mb-2">
                기기 SSID
              </label>
              <Input
                id="ssid"
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="기기 SSID를 입력하세요"
                className="rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front py-3 text-base text-app-text"
                required
              />
            </div>

            {error && <p className="text-sm text-error-text text-center font-medium">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-lanyard-front hover:bg-lanyard-front/90 text-white rounded-md py-3 text-base font-semibold transition-colors"
            >
              등록
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
