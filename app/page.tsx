import { getCards } from "@/actions/cards";
import { FC } from "react";
import CardsCarousel from "@/components/cards/CardsCarousel";
import StaticHeader from "@/components/layout/static-header";

const HomePage: FC = async () => {
  const cards = await getCards();

  return (
    <main className="flex flex-col">
      <StaticHeader title="Карты" />
      <div id="content" className="flex flex-1 flex-col py-6">
        {cards.status === 200 ? (
          <CardsCarousel cards={cards.data} />
        ) : (
          <h2 className="text-2xl font-bold">Что-то пошло не так :(</h2>
        )}
      </div>
    </main>
  );
};

export default HomePage;
