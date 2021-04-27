import { useEffect } from "react";

export default function useLoading(currentUser, setIsReady) {
  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        setIsReady(true);
      }, 3000);
    }
  }, [currentUser]);
}
