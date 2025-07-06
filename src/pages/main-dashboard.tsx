import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { RegisterModal } from "./register-modal";
import Header from "@/components/Header";

interface Device {
  id: string;
  modelName: string;
  busNumber: string;
  potholesFound: number;
  powerStatus: boolean;
}

export function MainDashboard() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      modelName: "CF-111",
      busNumber: "3",
      potholesFound: 19,
      powerStatus: true,
    },
    {
      id: "2",
      modelName: "CF-123",
      busNumber: "100",
      potholesFound: 1,
      powerStatus: true,
    },
    {
      id: "3",
      modelName: "CF-456",
      busNumber: "25",
      potholesFound: 0,
      powerStatus: false,
    },
  ]);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleDelete = (deviceId: string) => {
    if (confirm("정말로 이 기기를 삭제하시겠습니까?")) {
      setDevices(devices.filter((device) => device.id !== deviceId));
    }
  };

  const handleRegisterDevice = () => {
    setIsRegisterModalOpen(false);
  };

  const renderPowerStatus = (device: Device, index: number) => {
    if (device.powerStatus) {
      return (
        <>
          <div className="w-3 h-3 bg-power-on rounded-full mr-2 border-2 border-power-border" />
          <span className="text-sm font-medium text-power-on">ON</span>
        </>
      );
    } else {
      // 첫 번째 OFF 기기는 회색, 두 번째 OFF 기기는 빨간색
      const offDeviceIndex = devices.filter((d, i) => i <= index && !d.powerStatus).length;

      if (offDeviceIndex === 1) {
        // 첫 번째 OFF 기기 - 회색
        return (
          <>
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2 border-2 border-gray-500" />
            <span className="text-sm font-medium text-gray-500">OFF</span>
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full bg-app-background ">
        {/* 왼쪽 사이드바 */}
        <Header />
        {/* 오른쪽 메인 콘텐츠 */}
        <div className="flex-1 min-w-0 p-6">
          <div
            className="bg-form-background shadow-sm border border-gray-200 h-full min-h-[600px]"
            // className="bg-app-background border-0 border-gray-200 h-full min-h-[600px]"
            style={{
              borderTopRightRadius: "16px",
              borderTopLeftRadius: "0px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            {/* 관리 기기 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200 ">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-app-text">관리 기기</h1>
                <Button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-6 py-2"
                >
                  기기 등록
                </Button>
              </div>
            </div>

            {/* 테이블 */}
            <div className="p-6">
              <div className="overflow-x-auto">
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
                    {devices.map((device, index) => (
                      <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-app-text font-medium">{device.modelName}</td>
                        <td className="py-4 px-4 text-app-text">{device.busNumber}</td>
                        <td className="py-4 px-4 text-app-text">{device.potholesFound}개</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">{renderPowerStatus(device, index)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link to={`/detail/${device.id}`}>
                              <Button className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-4 py-1 text-sm">
                                상세
                              </Button>
                            </Link>
                            <Button
                              onClick={() => handleDelete(device.id)}
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

              {/* 빈 상태 메시지 */}
              {devices.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-app-text/60 text-lg">등록된 기기가 없습니다.</p>
                  <Button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-lanyard-front hover:bg-lanyard-front/90 text-white px-6 py-2 mt-4"
                  >
                    첫 번째 기기 등록하기
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
