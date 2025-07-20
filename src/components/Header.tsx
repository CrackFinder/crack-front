import { useMeQuery } from "@/query/meQuery";
import { Activity, AlertTriangle, CheckCircle, LogOut, Mail, Shield, User, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import axiosInstance from "@/query/axios";
import { accessTokenStore } from "@/store/accessTokenStore";

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}) => {
  return (
    <>
      {/* 데스크톱 사이드바 */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <HeaderComponent className="h-full" />
      </div>

      {/* 모바일 사이드바 오버레이 */}
      {isSidebarOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative w-80 max-w-[80vw]">
              <HeaderComponent className="h-full" onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const HeaderComponent = ({ className = "", onClose }: { className?: string; onClose?: () => void }) => {
  const { data: user } = useMeQuery();
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    accessTokenStore.getState().setAccessToken("");
    navigate("/");
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-lanyard-front via-lanyard-front to-lanyard-back"></div>

      {/* 장식적 요소들 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 모바일 닫기 버튼 */}
        <div className="lg:hidden flex justify-end p-4">
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* 로고 및 타이틀 영역 */}
        <div className="p-6 lg:p-8 text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 lg:w-6 lg:h-6 bg-lanyard-front rounded-md"></div>
            </div>
          </div>
          <h1 className="text-white text-lg lg:text-xl font-bold mb-2">PotHole Monitor</h1>
          <p className="text-white/70 text-sm">포트홀 관리 시스템</p>
        </div>

        {/* 위치 */}

        {user && (
          <div className="px-6 lg:px-8 mb-6 lg:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20">
              {/* 프로필 이미지 */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 lg:w-10 lg:h-10 text-lanyard-front" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* 사용자 정보 */}

              <div className="text-center mb-4">
                <h3 className="text-white font-semibold text-base lg:text-lg mb-1">{user.username}</h3>
                <p className="text-white/70 text-xs lg:text-sm flex items-center justify-center mb-2">
                  <Mail className="w-3 h-3 mr-1" />
                  {user.email}
                </p>
                <p className="text-white/60 text-xs">마지막 로그인: 2025-01-15 14:30</p>
              </div>

              {/* 역할 배지 */}
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-medium">시스템 관리자</span>
                </div>
              </div>

              {/* 사용자 통계 */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="text-white font-bold text-sm lg:text-base">{"x개"}</div>
                  <div className="text-white/70 text-xs">관리 기기</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="text-white font-bold text-sm lg:text-base">{"y개"}</div>
                  <div className="text-white/70 text-xs">발견 포트홀</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 빠른 통계 */}
        <div className="px-6 lg:px-8 mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white/90 font-medium text-sm">빠른 현황</h4>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-3 h-3 lg:w-4 lg:h-4 text-blue-300" />
                  </div>
                  <span className="text-white/90 text-xs lg:text-sm">총 기기</span>
                </div>
                <span className="text-white font-bold text-sm lg:text-base">{"a개"}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-300" />
                  </div>
                  <span className="text-white/90 text-xs lg:text-sm">활성 기기</span>
                </div>
                <span className="text-green-300 font-bold text-sm lg:text-base">{"b개"}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 lg:w-4 lg:h-4 text-orange-300" />
                  </div>
                  <span className="text-white/90 text-xs lg:text-sm">총 포트홀</span>
                </div>
                <span className="text-orange-300 font-bold text-sm lg:text-base">{"c개"}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 로그아웃 버튼 */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
