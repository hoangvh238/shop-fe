import { useCallback } from "react";

// Custom hook để mở URL trong tab mới
const useNewTabRedirect = () => {
  const openInNewTab = useCallback((url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    } else {
    }
  }, []);

  return [openInNewTab];
};

export default useNewTabRedirect;
