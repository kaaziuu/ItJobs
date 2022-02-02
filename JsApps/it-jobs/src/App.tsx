import { Setup } from "./utils/config/Config";
import Router from "./utils/route/Router";

function App() {
    Setup();
    return <Router />;
}

export default App;
