import { CountDownOverlayView } from "./CountDownOverlay.view";
import { useCountDownOverlayViewModel } from "./useCountDownOverlay.viewModel";

export interface CountDownOverlayProps {
  visibleCountDown: boolean;
  handleCountdownComplete: () => void;
}

export function CountDownOverlay(params: Readonly<CountDownOverlayProps>) {
  const viewModel = useCountDownOverlayViewModel(params);

  return <CountDownOverlayView {...viewModel} />;
}
