import { Provider } from "react-redux";
import MapBox from "./components/MapBox";
import TrafficLightObjects from "./components/TrafficLightObjects";
import { store } from "./redux/store";
import "./assets/styles/_styles.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <MapBox />
        <TrafficLightObjects />
      </div>
    </Provider>
  );
}

export default App;
