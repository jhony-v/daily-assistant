import Engine from "@/components/Engine";
import Image from "next/image";
import ia from "../public/ia.gif";
import "./(app)/app.scss";

export default function Home() {
  return (
    <main className="app-root">
      <div className="app__header">
        <h1 className="brand__title">
          Hello, <br /> my name is{" "}
          <span className="brand__title--name">Cygnus</span> 👋
        </h1>
        <p className="brand__helper">Your IA daily assistant...</p>
      </div>
      <div className="engine">
        <Image src={ia} alt="voice assistant" className="engine__placeholder" />
        <Engine/>
      </div>
      <div>
        <button type="button" className="brand__button">
          START
        </button>
      </div>
    </main>
  );
}
