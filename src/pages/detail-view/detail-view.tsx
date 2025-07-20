import Header from "@/components/Header";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, MapPin, Maximize2, Menu, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useRaspberryQuery } from "./useRaspberryQuery";
import { useState } from "react";
import { usePotholeStatusMutation } from "./usePotholeMutation";
import { useDeletePotholeMutation } from "./useDeletePotholeMutation";

export function DetailView() {
  const { deviceId } = useParams();
  const { data: raspberry, isSuccess } = useRaspberryQuery(deviceId!);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mutate: updateStatus } = usePotholeStatusMutation();
  const { mutate: deletePothole } = useDeletePotholeMutation();
  const handleStatusChange = updateStatus;

  if (!isSuccess) {
    return (
      <div className="flex min-h-screen bg-app-background">
        {/* 왼쪽 사이드바 */}
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-app-text text-lg">기기를 찾을 수 없습니다.</p>
            <Link to="/dashboard">
              <Button className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-6 py-2 mt-4">
                목록으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const device = raspberry.data;
  return (
    <div className="flex min-h-screen bg-app-background">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 p-6">
        <div
          className="bg-form-background shadow-sm border border-gray-200 h-full"
          style={{
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={() => setIsSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className="lg:hidden text-app-text hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-app-text">{raspberry.data.name} 상세 정보</h1>
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>목록으로</span>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 기기 정보 */}
              <Card className="bg-app-background shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-app-text mb-4">기기 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-app-text/70">장치명:</span>
                      <span className="text-app-text font-medium">{raspberry.data.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text/70">버스번호:</span>
                      <span className="text-app-text font-medium">{raspberry.data.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text/70">포트홀 발견:</span>
                      <span className="text-app-text font-bold text-lg">{raspberry.data.potholes.length}개</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 포트홀 정보 목록 */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-app-text">포트홀 발견 정보</h3>

                {device.potholes.map((pothole) => (
                  <Card key={pothole.id} className="bg-form-background shadow-lg">
                    <CardContent className="p-6">
                      {/* 상단: 시간 정보와 상태, 삭제 버튼 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-app-text/60" />
                          <span className="text-xs lg:text-sm text-app-text/70">발견 시간:</span>
                          <span className="text-app-text font-medium text-xs lg:text-sm">
                            {new Date(pothole.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {renderStatusBadge(pothole.status)}
                          <Button
                            onClick={() => deletePothole({ potholeId: pothole.id })}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 p-1.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Button
                          onClick={() =>
                            handleStatusChange({
                              potholeId: pothole.id,
                              status: pothole.status === "미처리" ? "처리완료" : "미처리",
                            })
                          }
                          size="sm"
                          className={`${
                            pothole.status === "미처리"
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-orange-600 hover:bg-orange-700 text-white"
                          } text-xs px-3 py-1`}
                        >
                          {pothole.status === "미처리" ? "처리완료로 변경" : "미처리로 변경"}
                        </Button>
                      </div>

                      <div className="grid  grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6">
                        {/* 1열: 위치 정보 */}
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-app-text/60 mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="text-sm text-app-text/70">위치:</span>
                              <p className="text-app-text font-medium break-words">{pothole.address}</p>
                              <p className="text-xs text-app-text/50 mt-1">
                                {pothole.latitude.toFixed(6)}, {pothole.longitude.toFixed(6)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 2열: 지도 */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-app-text/70">위치 지도:</span>
                            <Link
                              to={`/map/${deviceId}?potholeId=${pothole.id}&lat=${pothole.latitude}&lng=${
                                pothole.longitude
                              }&location=${encodeURIComponent(pothole.address)}&potholeId=${pothole.id}`}
                              className="text-xs text-lanyard-front hover:text-lanyard-front/80 flex items-center space-x-1"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>크게 보기</span>
                            </Link>
                          </div>
                          <div className="relative">
                            {/* 실제 Map 컴포넌트를 여기에 넣으세요 */}
                            <div
                              className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative"
                              style={{ minHeight: "128px" }}
                            >
                              {/* Map 컴포넌트 스켈레톤 자리 */}
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                                <div className="text-center">
                                  <MapPin className="w-6 h-6 text-lanyard-front mx-auto mb-1" />
                                  <p className="text-xs text-app-text/60">지도 영역</p>
                                </div>
                              </div>
                              {/* 실제 Map 컴포넌트 */}
                              <Map
                                className="w-full h-full"
                                latitude={pothole.latitude}
                                longitude={pothole.longitude}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-app-text/70 mb-2">포트홀 이미지</p>
                          <img
                            src={pothole?.image || "/placeholder.svg"}
                            alt="포트홀 이미지"
                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const renderStatusBadge = (status: string) => {
  if (status === "처리완료") {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
        처리완료
      </div>
    );
  }
  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
      <div className="w-2 h-2 bg-orange-500 rounded-full mr-1.5" />
      미처리
    </div>
  );
};
