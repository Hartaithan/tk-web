import { getCards } from "@/actions/cards";
import { FC } from "react";

const HomePage: FC = async () => {
  const cards = await getCards();

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold mb-6">Hello World!</h2>
      {cards.status === 200 ? (
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(cards, null, 2)}
        </pre>
      ) : (
        <h2 className="text-2xl font-bold">Что-то пошло не так :(</h2>
      )}
    </main>
  );
};

export default HomePage;
