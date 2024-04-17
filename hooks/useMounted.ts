import { useEffect, useState } from "react";

export default function useMounted() {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  return isMounted;
}
