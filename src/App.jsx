import Header from "./components/Header";
import Main from "./components/Main";
import { AppProvider } from "./context/AppContext";

function App() {


  return (
    <>
      <AppProvider>
        <div className="App">
          <Header />
          <Main />
        </div>
      </AppProvider>
    </>
  )
}

export default App
