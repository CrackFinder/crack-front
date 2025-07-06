import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRaspberryRegisterMutation } from "@/query/raspberryRegisterMutation";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export function RegisterModal({ isOpen, onClose, onRegister }: RegisterModalProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState("");

  const { mutate: register } = useRaspberryRegisterMutation();

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setId("");
      setName("");
      setIp("");
      setPort("");
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

    if (!id.trim()) {
      setError("예외 : ID를 입력해 주세요");
      return;
    }

    if (!name.trim()) {
      setError("예외 : 이름을 입력해 주세요");
      return;
    }

    if (!ip.trim()) {
      setError("예외 : IP 주소를 입력해 주세요");
      return;
    }

    if (!port.trim()) {
      setError("예외 : 포트를 입력해 주세요");
      return;
    }

    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      setError("예외 : 유효한 포트 번호를 입력해 주세요 (1-65535)");
      return;
    }

    setError("");
    register({ id, name, ip, port: portNumber });
    onRegister();
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
              <label htmlFor="modal-id" className="block text-sm font-medium text-app-text mb-2">
                ID
              </label>
              <Input
                id="modal-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID를 입력하세요"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="modal-name" className="block text-sm font-medium text-app-text mb-2">
                이름
              </label>
              <Input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
              />
            </div>

            <div>
              <label htmlFor="modal-ip" className="block text-sm font-medium text-app-text mb-2">
                IP 주소
              </label>
              <Input
                id="modal-ip"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full rounded-md border-gray-300 focus:border-lanyard-front focus:ring-lanyard-front text-app-text"
              />
            </div>

            <div>
              <label htmlFor="modal-port" className="block text-sm font-medium text-app-text mb-2">
                포트
              </label>
              <Input
                id="modal-port"
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="8080"
                min="1"
                max="65535"
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
