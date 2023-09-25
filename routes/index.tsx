import { useSignal } from "@preact/signals";
import Tree from "../islands/Tree.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-white dark:bg-slate-800 h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to iframe plugin</h1>
        <div>
          <Tree />
        </div>
      </div>
    </div>
  );
}
