import { bootstrapCameraKit, CameraKitSession, Lens } from '@snap/camera-kit';
import { createContext, useEffect, useRef, useState } from 'react';

const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzIxMDQ5MzYzLCJzdWIiOiI3ZjViY2FjYS05MTM5LTQxNDgtYjI2Yy1lYjJhZThkMGRiZGV-U1RBR0lOR35lZTk2ZjY0MS1mMGE4LTQxM2UtODhkNS1lNGM4M2ZjNDcxOWQifQ.9FhZTRY4iNLGwdV5jap00GHyrBaI4GfT8dYpCP9tzMM';
const lensGroupId = '7fdd2b3d-f1aa-4b11-ac54-3a220f939baa';

export interface CameraKitState {
  session: CameraKitSession;
  lenses: Lens[];
}

export const CameraKitContext = createContext<CameraKitState | null>(null);
export const CameraKit: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isInitialized = useRef<boolean>(false);
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [lenses, setLenses] = useState<Lens[]>([]);

  useEffect(() => {
    const initializeCameraKit = async () => {
      const cameraKit = await bootstrapCameraKit({ apiToken });
      const session = await cameraKit?.createSession();
      const lens = await cameraKit?.lensRepository.loadLens(
        "77da6035-217a-4603-97e6-0e4d9411c538",
        "7529d00e-fca3-4fde-bff3-45fce43a6e43"
      );

      setLenses([lens]);
      setSession(session);
    };

    if (isInitialized.current) return;
    isInitialized.current = true;

    initializeCameraKit();
  }, []);
  return !session ? (
    <div>Initializing Camera Kit...</div>
  ) : (
    <CameraKitContext.Provider value={{ session, lenses }}>
      {children}
    </CameraKitContext.Provider>
  );
};