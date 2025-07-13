import { useMeQuery } from "@/query/meQuery";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import axiosInstance from "@/query/axios";
import { accessTokenStore } from "@/store/accessTokenStore";

const Header = () => {
  const { data: user } = useMeQuery();
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    accessTokenStore.getState().setAccessToken("");
    navigate("/");
  };

  return (
    <div className="w-80  bg-lanyard-front flex flex-col">
      {/* 로고 영역 */}
      <div className="p-6 text-center">
        <div className="text-white text-sm opacity-80 mb-8">로고(생긴다면)</div>
      </div>

      {/* 관리자 프로필 영역 */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        {/* 아바타 */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* 관리자 정보 */}

        <div className="text-center text-white">
          <h2 className="text-lg font-semibold mb-2">{user?.username ?? "관리자 이름"}</h2>
          <p className="text-sm opacity-80">{user?.email ?? "관리자 이메일"}</p>
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
  );
};

export default Header;
