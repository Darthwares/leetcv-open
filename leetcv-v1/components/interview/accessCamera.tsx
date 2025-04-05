import { VideoCameraIcon } from "@heroicons/react/outline";
import { accessCameraState } from "@state/state";
import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

const AccessCamera = ({
  isInterviewActive,
}: {
  isInterviewActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState("");
  const setAccessCamera = useSetRecoilState(accessCameraState);
  const mediaStreamRef = useRef<MediaStream | null>(null);

 useEffect(() => {
   const startCamera = async () => {
     if (!isInterviewActive) {
     await navigator.mediaDevices
       .getUserMedia({ video: true, audio: false })
       .then((mediaStream) => {
         const stream = mediaStream;
         const tracks = stream.getTracks();
         tracks[0].stop;
       });
       return;
     }

     try {
       const stream = await navigator.mediaDevices.getUserMedia({
         video: true,
       });
       mediaStreamRef.current = stream;
       if (videoRef.current) {
         videoRef.current.srcObject = stream;
       }
       setAccessCamera(true);
     } catch (error) {
       console.error("Error accessing webcam:", error);
       setError("Could not access webcam. Please allow camera permissions.");
       setAccessCamera(false);
     }
   };

   startCamera();

   return () => {
     if (mediaStreamRef.current) {
       mediaStreamRef.current.getTracks().forEach((track) => track.stop());
     }
   };
 }, [isInterviewActive, setAccessCamera]);
  
  return (
    <div className="relative w-full rounded-lg sm:rounded-b-md">
      <div className="rounded-lg sm:rounded-b-md h-full">
        {isInterviewActive && !error && videoRef ? (
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full bg-gray-300 object-cover rounded-lg sm:rounded-b-md"
            style={{
              aspectRatio: "16 / 9",
              transform: "scaleX(-1)",
            }}
          />
        ) : (
          <>
            <div className="border-2 rounded-lg border-dashed md:flex hidden p-2 flex-col justify-center items-center">
              <VideoCameraIcon
                className="h-32 lg:h-40 text-gray-500"
                strokeWidth={1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccessCamera;
