import { useState } from "react";

export function PotholeTest() {
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({ raspberry_id: 1, address: "1234", latitude: "135.123", longitude: "37.5" })
    );
    formData.append("video", video!);
    const res = fetch("http://127.0.0.1:5000/pothole/potholes", { method: "POST", body: formData }).then((e) => {
      console.log(e);
      e.json().then(console.log);
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("video", e.currentTarget.files?.[0]);
    setVideo(e.currentTarget.files?.[0] || null);
  };
  return (
    <div>
      <input type="file" name="aaa" onChange={handleVideoUpload} />
      <button onClick={handleSubmit2}>submit</button>
    </div>
  );
}
