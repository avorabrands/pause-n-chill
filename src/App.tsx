import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Combos } from './components/Combos';
import { Menu } from './components/Menu';
import { Featured } from './components/Featured';
import { Why } from './components/Why';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { FloatingContact } from './components/FloatingContact';

export default function App() {
  return (
    <CartProvider>
      <a href="#menu" className="skip-link">Skip to menu</a>
      <Header />
      <main>
        <Hero />
        <Combos />
        <Menu />
        <Featured />
        <Why />
        <Contact />
      </main>
      <Footer />
      <CartModal />
      <FloatingContact />
    </CartProvider>
  );
}
