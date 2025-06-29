import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import Materials from './components/Materials';
import Canvas from './components/Canvas';
import Operation from './components/Operation';

function App() {
  return (
    <div className="flex h-[100vh] w-full flex-col">
      <Header />

      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Materials />
        </Allotment.Pane>

        <Allotment.Pane>
          <Canvas />
        </Allotment.Pane>

        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Operation />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
