import { useWindowDimensions } from "tamagui";

interface ScreenSizeOption {
  paddingX?: number
} 

const DEFAULT_OPTIONS = {
  paddingX: 40
}

export const useScreenSize = (options?: ScreenSizeOption) => {
  const { paddingX } = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  const { width, height } = useWindowDimensions();

  return {
    width: width - paddingX,
    height
  }
}
