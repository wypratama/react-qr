import React, { useState, useEffect, useRef, ReactNode } from 'react';
import jsQR from 'jsqr';
import './qr.css';

interface QRReaderProps {
  onResult: (result: string) => void;
  scanDelay?: number;
  width?: string;
  children?: ReactNode;
  useFrame?: boolean;
  style?: React.CSSProperties;
}

const QRReader: React.FC<QRReaderProps> = ({
  onResult,
  width,
  style,
  children,
  useFrame = true,
  scanDelay = 0,
}) => {
  const [, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      const constraints = { video: { facingMode: 'environment' } };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        streamRef.current = stream;
        requestAnimationFrame(tick);
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    const tick = () => {
      if (videoRef.current?.readyState === videoRef.current?.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
          const ctx = canvas.getContext('2d');

          if (ctx) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );

            if (code) {
              setResult(code.data);
              onResult(code.data);
            }
          }
        }
      }
      setTimeout(() => requestAnimationFrame(tick), scanDelay);
    };

    startVideo();

    return () => {
      // Cleanup function to stop the stream when the component is unmounted
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, [onResult, scanDelay]);

  return (
    <div
      className={`qr-reader ${useFrame ? 'qr-reader--with-default' : ''}`}
      style={{ width: width, ...style }}
    >
      <div className='qr-reader__viewfinder'></div>
      <video ref={videoRef} className='qr-reader__video' />
      <canvas ref={canvasRef} className='qr-reader__canvas' />
      <div className='qr-reader__children'>{children}</div>
    </div>
  );
};

export default QRReader;
