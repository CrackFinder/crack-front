export interface RaspberryRegisterParams {
  id: string;
  name: string;
  ip: string;
  port: number;
}


export interface Raspberry {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: string;
  user_id: number;
  created_at: string;
  potholes: Pothole[];
}

export interface Pothole {
  id: string;
  video_path: string;
  address: string;
  raspberry_id: string;
  latitude: number;
  longitude: number;
  created_at: string;
  status: string;
}