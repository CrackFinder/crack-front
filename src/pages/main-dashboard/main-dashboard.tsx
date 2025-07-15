import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { RegisterModal } from "../register-modal";
import Header from "@/components/Header";
import { useRaspberriesQuery } from "./useRaspberriesQuery";
import { useRaspberryDeleteMutation } from "./useRaspberryDeleteMutation";
import { useRaspberryCreateMutation } from "./useRaspberryCreateMutation";
import { DotLoadingSpinner } from "./LoadingSpinner";
import { Activity, AlertTriangle, CheckCircle, Menu, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Raspberry } from "@/type/Raspberry";

export function MainDashboard() {
  const { data: raspberrys, isSuccess } = useRaspberriesQuery();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mutate: deleteRaspberry } = useRaspberryDeleteMutation();
  const { mutate: createRaspberry } = useRaspberryCreateMutation();

  // 통계 계산
  const totalDevices = raspberrys?.data.raspberries.length || 0;
  const activeDevices = raspberrys?.data.raspberries.filter((r) => r.status === "online").length || 0;
  const totalPotholes = raspberrys?.data.raspberries.reduce((sum, r) => sum + r.potholes.length, 0) || 0;
  const offlineDevices = raspberrys?.data.raspberries.filter((r) => r.status === "offline").length || 0;

  const handleDelete = (deviceId: string) => {
    if (confirm("정말로 이 기기를 삭제하시겠습니까?")) {
      deleteRaspberry(deviceId);
    }
  };

  const handleRegisterDevice = (deviceData: Raspberry) => {
    createRaspberry(deviceData);
    setIsRegisterModalOpen(false);
  };

  const renderPowerStatus = (isOnline: boolean) => {
    if (isOnline) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
          ON
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-xs">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
        OFF
      </Badge>
    );
  };

  return (
    <>
      <div className="flex min-h-screen w-full bg-app-background">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Header className="h-full" />
        </div>

        {/* 모바일 사이드바 오버레이 */}
        {isSidebarOpen && (
          <>
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
              <div className="relative w-80 max-w-[80vw]">
                <Header className="h-full" />
              </div>
            </div>
          </>
        )}

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0 p-3 lg:p-6">
          <div
            className="bg-form-background shadow-sm border border-gray-200 h-full min-h-[600px] rounded-lg lg:rounded-none"
            style={{
              borderTopRightRadius: window.innerWidth >= 1024 ? "16px" : "8px",
              borderTopLeftRadius: window.innerWidth >= 1024 ? "0px" : "8px",
              borderBottomRightRadius: window.innerWidth >= 1024 ? "0px" : "8px",
              borderBottomLeftRadius: window.innerWidth >= 1024 ? "0px" : "8px",
            }}
          >
            {/* 헤더 영역 */}
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* 모바일 메뉴 버튼 */}
                  <Button
                    onClick={() => setIsSidebarOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-app-text hover:bg-gray-100"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-app-text">관리 기기</h1>
                    <p className="text-app-text/60 text-xs lg:text-sm mt-1 hidden sm:block">
                      등록된 기기들의 상태를 모니터링하세요
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-3 lg:px-6 py-2 text-sm lg:text-base"
                >
                  <Plus className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">기기 등록</span>
                  <span className="sm:hidden">등록</span>
                </Button>
              </div>

              {/* 통계 카드들 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <Card>
                  <CardContent className="p-3 lg:p-4 ">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="p-1.5 lg:p-2 bg-blue-100 rounded-lg">
                        <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm text-app-text/60">총 기기</p>
                        <p className="text-lg lg:text-xl font-bold text-app-text">{totalDevices}개</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="p-1.5 lg:p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm text-app-text/60">활성 기기</p>
                        <p className="text-lg lg:text-xl font-bold text-green-600">{activeDevices}개</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="p-1.5 lg:p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm text-app-text/60">오프라인</p>
                        <p className="text-lg lg:text-xl font-bold text-red-600">{offlineDevices}개</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="p-1.5 lg:p-2 bg-orange-100 rounded-lg">
                        <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm text-app-text/60">총 포트홀</p>
                        <p className="text-lg lg:text-xl font-bold text-orange-600">{totalPotholes}개</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 테이블 영역 */}
            <div className="p-4 lg:p-6">
              {/* 로딩 상태 */}
              {!isSuccess && (
                <div className="flex justify-center items-center py-20">
                  <DotLoadingSpinner size="xl" variant="primary" />
                </div>
              )}

              {/* 모바일 카드 뷰 */}
              {isSuccess && (
                <div className="block lg:hidden space-y-4">
                  {raspberrys.data.raspberries.map((raspberry) => (
                    <Card key={raspberry.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-app-text">{raspberry.name}</h3>
                          <p className="text-sm text-app-text/60">버스번호: {raspberry.name}</p>
                        </div>
                        {renderPowerStatus(raspberry.status === "online")}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                          {raspberry.potholes.length}개 포트홀
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleDelete(raspberry.id)}
                            className="bg-delete-button hover:bg-delete-button/90 text-white text-sm px-3 py-1"
                          >
                            삭제
                          </Button>
                          <Link to={`/detail/${raspberry.id}`}>
                            <Button className="bg-lanyard-front hover:bg-lanyard-front/90 text-white text-sm px-3 py-1">
                              상세
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* 데스크톱 테이블 뷰 */}
              {isSuccess && (
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-app-text">모델명</th>
                        <th className="text-left py-4 px-4 font-semibold text-app-text">버스번호</th>
                        <th className="text-left py-4 px-4 font-semibold text-app-text">발견한 포트홀</th>
                        <th className="text-left py-4 px-4 font-semibold text-app-text">전원상태</th>
                        <th className="text-center py-4 px-4 font-semibold text-app-text">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {raspberrys.data.raspberries.map((raspberry) => (
                        <tr key={raspberry.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-app-text font-medium">{raspberry.name}</td>
                          <td className="py-4 px-4 text-app-text">{raspberry.name}</td>
                          <td className="py-4 px-4 text-app-text">{raspberry.potholes.length}개</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">{renderPowerStatus(raspberry.status === "online")}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Link to={`/detail/${raspberry.id}`}>
                                <Button className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-4 py-1 text-sm">
                                  상세
                                </Button>
                              </Link>
                              <Button
                                onClick={() => handleDelete(raspberry.id)}
                                className="bg-delete-button hover:bg-delete-button/90 text-white px-4 py-1 text-sm"
                              >
                                삭제
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 빈 상태 메시지 */}
              {isSuccess && raspberrys.data.raspberries.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-app-text/60 text-lg mb-4">등록된 기기가 없습니다.</p>
                  <Button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-6 py-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />첫 번째 기기 등록하기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 등록 모달 */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterDevice}
      />
    </>
  );
}
