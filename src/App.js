import { TopBar, HeroSection, TrendingSection, Footer } from "./components/index"

function App() {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <main>
        <section>
          <HeroSection />
        </section>

        <section>
          <TrendingSection />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
