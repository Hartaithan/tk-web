import { getCards } from "@/actions/get-cards";
import { FC } from "react";
import CardsCarousel from "@/components/cards/CardsCarousel";
import StaticHeader from "@/components/layout/static-header";

const HomePage: FC = async () => {
  const cards = await getCards();

  return (
    <main className="flex flex-col">
      <StaticHeader title="Карты" />
      <div id="content" className="flex flex-1 flex-col py-6">
        {cards.status === 200 && cards.data.length > 0 && (
          <CardsCarousel cards={cards.data} />
        )}
        {cards.status === 200 && cards.data.length === 0 && (
          <h2 className="text-md font-bold w-full text-center">
            У вас нет карт
          </h2>
        )}
        {cards.status !== 200 && (
          <h2 className="text-md font-bold">Что-то пошло не так :(</h2>
        )}
      </div>
    </main>
  );
};

export default HomePage;
