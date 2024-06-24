import AppHeader from "./AppHeader";
import FileViewComponent from "./components/FileViewComponent";
import "./components/Table/table.css";
import "./components/TableToolbar/table-toolbar.css";

// TODO: Routing, lazyloading
// TODO: Tree splitting, etc.
function App() {
  return (
    <div>
      <AppHeader />
      <FileViewComponent />
    </div>
  );
}

export default App;
