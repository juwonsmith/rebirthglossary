import Form from "./Components/Form";
import List from "./Components/List";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-white flex flex-col">
      <Form />
      <List />
    </main>
  );
}
