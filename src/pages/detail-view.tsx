import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { Link, useParams } from "react-router";

interface PotholeData {
  id: string;
  discoveryTime: string;
  location: string;
  image: string;
}

export function DetailView() {
  const { deviceId } = useParams();

  // 임시 데이터
  const deviceData = {
    "1": { modelName: "CF-111", busNumber: "3", potholesFound: 4 },
    "2": { modelName: "CF-123", busNumber: "100", potholesFound: 1 },
  };

  const potholeData: PotholeData[] = [
    {
      id: "1",
      discoveryTime: "2025-06-10 | 03:33",
      location: "부산광역시....",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      discoveryTime: "2025-06-09 | 14:22",
      location: "부산광역시 해운대구...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      discoveryTime: "2025-06-08 | 09:15",
      location: "부산광역시 중구...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      discoveryTime: "2025-06-07 | 16:45",
      location: "부산광역시 동래구...",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const device = deviceData[deviceId as keyof typeof deviceData];

  if (!device) {
    return (
      <div className="flex min-h-screen bg-app-background">
        {/* 왼쪽 사이드바 */}
        <div className="w-80 bg-lanyard-front flex flex-col">
          <div className="p-6 text-center">
            <div className="text-white text-sm opacity-80 mb-8">로고(생긴다면)</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-start pt-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div className="text-center text-white">
              <h2 className="text-lg font-semibold mb-2">관리자 이름</h2>
              <p className="text-sm opacity-80">정보들..</p>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
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

  return (
    <div className="flex min-h-screen bg-app-background">
      {/* 왼쪽 사이드바 */}
      <div className="w-80 bg-lanyard-front flex flex-col">
        <div className="p-6 text-center">
          <div className="text-white text-sm opacity-80 mb-8">로고(생긴다면)</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-start pt-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div className="text-center text-white">
            <h2 className="text-lg font-semibold mb-2">관리자 이름</h2>
            <p className="text-sm opacity-80">정보들..</p>
          </div>
        </div>
      </div>

      {/* 오른쪽 메인 콘텐츠 */}
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
              <h1 className="text-2xl font-bold text-app-text">{device.modelName} 상세 정보</h1>
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
                      <span className="text-app-text/70">모델명:</span>
                      <span className="text-app-text font-medium">{device.modelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text/70">버스번호:</span>
                      <span className="text-app-text font-medium">{device.busNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text/70">포트홀 발견:</span>
                      <span className="text-app-text font-bold text-lg">{device.potholesFound}개</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 포트홀 정보 목록 */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-app-text">포트홀 발견 정보</h3>

                {potholeData.slice(0, device.potholesFound).map((pothole) => (
                  <Card key={pothole.id} className="bg-form-background shadow-lg">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-app-text/60" />
                            <span className="text-sm text-app-text/70">발견 시간:</span>
                            <span className="text-app-text font-medium">{pothole.discoveryTime}</span>
                          </div>

                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-app-text/60 mt-1" />
                            <div>
                              <span className="text-sm text-app-text/70">위치:</span>
                              <p className="text-app-text font-medium">{pothole.location}</p>
                              <p className="text-sm text-app-text/60 mt-1">(위치에 대한 지도)</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-app-text/70 mb-2">포트홀 이미지</p>
                          <img
                            src={pothole.image || "/placeholder.svg"}
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
