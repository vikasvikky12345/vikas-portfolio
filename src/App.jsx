import { Doc, Navbar, Welcome } from "#components";
import { Safari, Terminal } from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Doc />
      <Terminal />
      <Safari/>
   </main>
    )
}

export default App;