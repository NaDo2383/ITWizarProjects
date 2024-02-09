import { DeactiveProvider } from "./deactiveContext";
import Deactivate from "./Deactivate";

function ResignMembership() {
  return (
    <DeactiveProvider>
        <Deactivate />
    </DeactiveProvider>
  )
}

export default ResignMembership