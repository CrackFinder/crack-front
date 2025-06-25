import Header from "@/components/Header";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Maximize2 } from "lucide-react";
import { Link, useParams } from "react-router";

interface PotholeData {
  id: string;
  discoveryTime: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  image: string;
}

// 임시 데이터
const deviceData = {
  "1": { modelName: "CF-111", busNumber: "3", potholesFound: 4 },
  "2": { modelName: "CF-123", busNumber: "100", potholesFound: 1 },
};

const potholeData: PotholeData[] = [
  {
    id: "1",
    discoveryTime: "2025-06-10 | 03:33",
    location: {
      address: "부산광역시....",
      latitude: 33.450701,
      longitude: 126.570667,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    discoveryTime: "2025-06-09 | 14:22",
    location: {
      address: "부산광역시 해운대구...",
      latitude: 33.471701,
      longitude: 126.570667,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    discoveryTime: "2025-06-08 | 09:15",
    location: {
      address: "부산광역시 중구입니다...",
      latitude: 33.463701,
      longitude: 126.570667,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    discoveryTime: "2025-06-07 | 16:45",
    location: {
      address: "부산광역시 동래구...",
      latitude: 33.491701,
      longitude: 126.570667,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function DetailView() {
  const { deviceId } = useParams();
  console.log("deviceid:", deviceId);
  const device = deviceData[deviceId as keyof typeof deviceData];
  console.log("2", device);

  if (!device) {
    return (
      <div className="flex min-h-screen bg-app-background">
        {/* 왼쪽 사이드바 */}ff
        <Header />
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
  console.log("3");
  return (
    <div className="flex min-h-screen bg-app-background">
      {/* 왼쪽 사이드바 */}
      <Header />
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
                      <div className="grid  grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6">
                        {/* 1열: 위치 정보 */}
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-app-text/60 mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="text-sm text-app-text/70">위치:</span>
                              <p className="text-app-text font-medium break-words">{pothole.location.address}</p>
                              <p className="text-xs text-app-text/50 mt-1">
                                {pothole.location.latitude.toFixed(6)}, {pothole.location.longitude.toFixed(6)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 2열: 지도 */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-app-text/70">위치 지도:</span>
                            <Link
                              to={`/map/${deviceId}?potholeId=${pothole.id}&lat=${pothole.location.latitude}&lng=${
                                pothole.location.longitude
                              }&location=${encodeURIComponent(pothole.location.address)}&potholeId=${pothole.id}`}
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
                                latitude={pothole.location.latitude}
                                longitude={pothole.location.longitude}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
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
