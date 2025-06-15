import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: { modelName: string; busNumber: string; ssid: string }) => void;
}

export function RegisterModal({ isOpen, onClose, onRegister }: RegisterModalProps) {
  const [modelName, setModelName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [ssid, setSsid] = useState("");
  const [error, setError] = useState("");

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setModelName("");
      setBusNumber("");
      setSsid("");
      setError("");
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!modelName.trim()) {
      setError("예외 : 기기번호(모델명)를 입력해 주세요");
      return;
    }

    if (!busNumber.trim()) {
      setError("예외 : 버스번호를 입력해 주세요");
      return;
    }

    if (!ssid.trim()) {
      setError("예외 : 기기 SSID를 입력해 주세요");
      return;
    }

    setError("");
    onRegister({ modelName, busNumber, ssid });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-app-text">기기 등록</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="모달 닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modal-modelName" className="block text-sm font-medium text-app-text mb-2">
                기기번호(모델명)
              </label>
              <Input
                id="modal-modelName"
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="CF-111"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="modal-busNumber" className="block text-sm font-medium text-app-text mb-2">
                버스번호
              </label>
              <Input
                id="modal-busNumber"
                type="text"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                placeholder="버스번호를 입력하세요"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
              />
            </div>

            <div>
              <label htmlFor="modal-ssid" className="block text-sm font-medium text-app-text mb-2">
                기기 SSID
              </label>
              <Input
                id="modal-ssid"
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="기기 SSID를 입력하세요"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
              />
            </div>

            {error && (
              <div className="text-center">
                <p className="text-sm text-error-text font-medium">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-lanyard-front hover:bg-lanyard-front/90 text-white py-3 text-base font-semibold transition-colors"
              >
                등록
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
