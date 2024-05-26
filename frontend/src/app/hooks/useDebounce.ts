import { ChangeEvent } from "react";

export const useDebounce = (callback: () => void, delay: number) => {
  let timer: number;
  return () => {
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      callback();
    }, delay);
  };
};
