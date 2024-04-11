import logo from './logo.svg';
import './App.css';
import LongPulling from './LongPulling';
import EventSourcing from './EventSourcing';
import Websoket from './Websoket';

function App() {
  return (
    <div className="App">
      {/* <EventSourcing /> */}
      <Websoket />
      {/* <LongPulling /> */}
    </div>
  );
}

export default App;
