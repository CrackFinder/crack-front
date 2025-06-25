import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft, MapPin, Navigation, Maximize2 } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";

interface MapViewProps {
  deviceId: string;
  potholeId?: string;
  lat?: string;
  lng?: string;
  location?: string;
}

export function MapView() {
  const { deviceId } = useParams();
  const [searchParams] = useSearchParams();
  const potholeId = searchParams.get("potholeId");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const location = searchParams.get("location");

  // 임시 좌표 데이터 (실제로는 API에서 가져올 것)
  const coordinates = {
    lat: lat || "35.1595",
    lng: lng || "129.0756",
  };

  const locationName = location || "부산광역시 해운대구";

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
          <div className="p-6 h-full flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-app-text">포트홀 위치</h1>
              <Link to={`/detail/${deviceId}`}>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>상세로 돌아가기</span>
                </Button>
              </Link>
            </div>

            {/* 위치 정보 카드 */}
            <Card className="bg-app-background shadow-lg mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-lanyard-front" />
                  <div>
                    <h3 className="font-semibold text-app-text">{locationName}</h3>
                    <p className="text-sm text-app-text/60">
                      좌표: {coordinates.lat}, {coordinates.lng}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 지도 영역 */}
            <div className="flex-1 min-h-[400px]">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden">
                    {/* 실제 지도 API 연동 전 플레이스홀더 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-lanyard-front rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-app-text mb-2">지도 영역</h3>
                        <p className="text-app-text/60 mb-4">
                          실제 구현 시 Google Maps, Naver Maps, <br />
                          또는 Kakao Maps API가 여기에 표시됩니다
                        </p>
                        <div className="space-y-2 text-sm text-app-text/80">
                          <p>
                            <strong>위치:</strong> {locationName}
                          </p>
                          <p>
                            <strong>좌표:</strong> {coordinates.lat}, {coordinates.lng}
                          </p>
                          {potholeId && (
                            <p>
                              <strong>포트홀 ID:</strong> {potholeId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Map className="w-full h-full" latitude={Number(lat)} longitude={Number(lng)} />

                    {/* 지도 컨트롤 버튼들 */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button
                        size="sm"
                        className="bg-white hover:bg-gray-50 text-app-text shadow-md"
                        onClick={() => {
                          // 실제 구현 시 지도 확대/축소 기능
                          alert("지도 확대 기능 (구현 예정)");
                        }}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white hover:bg-gray-50 text-app-text shadow-md"
                        onClick={() => {
                          // 실제 구현 시 현재 위치로 이동
                          alert("현재 위치로 이동 (구현 예정)");
                        }}
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* 포트홀 마커 표시 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 하단 액션 버튼들 */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-6 py-2"
                onClick={() => {
                  // 외부 지도 앱으로 열기
                  const url = `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`;
                  window.open(url, "_blank");
                }}
              >
                Google Maps에서 열기
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2"
                onClick={() => {
                  // 좌표 복사
                  navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`);
                  alert("좌표가 클립보드에 복사되었습니다!");
                }}
              >
                좌표 복사
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
