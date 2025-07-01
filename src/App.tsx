import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Operation from './components/Operation/Operation';
import { MaterialWrapper } from './components/MaterialsWrapper';
import { useComponentStore } from './store';
import { Preview } from './components/Preview';

function App() {
  const { mode } = useComponentStore();

  return (
    <div className="flex h-[100vh] w-full flex-col">
      <Header />

      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={500} minSize={200}>
            <MaterialWrapper />
          </Allotment.Pane>

          <Allotment.Pane>
            <Canvas />
          </Allotment.Pane>

          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Operation />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}

export default App;
