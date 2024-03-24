import "./App.css";
import BookForm from "./components/BookForm/BookForm";
import BookList from "./components/BookList/BookList";
import Error from "./components/Error/Error";
import Filter from "./components/Filter/Filter";
import ParticlesContainer from "./components/ParticlesContainer/ParticlesContainer";
import Sound from "./components/Sound/Sound";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Library</h1>
      </header>
      <main className="app-main">
        <ParticlesContainer />
        <div className="app-left-column">
          <BookForm />
        </div>
        <div className="app-right-column">
          <Filter />
          <div className="divider"></div>
          <BookList />
        </div>
      </main>
      <Sound />
      <Error />
    </div>
  );
}

export default App;
