import Header from "./components/Header";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Creations from "./components/Creations";
import Values from "./components/Values";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Intro from "./components/Intro";

export default function App() {
  return (
    <div id="top">
      <Intro />
      <Header />
      <main>
        <Hero />
        <Story />
        <Creations />
        <Values />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
