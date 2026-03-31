import { CountDownOverlayView } from "./CountDownOverlay.view";
import { useCountDownOverlayViewModel } from "./useCountDownOverlay.viewModel";

export function CountDownOverlay() {
  const viewModel = useCountDownOverlayViewModel();

  return <CountDownOverlayView {...viewModel} />;
}
