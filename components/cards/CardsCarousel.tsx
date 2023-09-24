"use client";

import { Card as CardItem } from "@/models/card";
import useEmblaCarousel from "embla-carousel-react";
import { FC } from "react";
import Card from "./Card";

interface CarouselProps {
  cards: CardItem[];
}

interface CardProps {
  card: CardItem;
}

const CardSlide: FC<CardProps> = (props) => {
  const { card } = props;

  return (
    <div className="flex-[0_0_100%] min-w-0 flex justify-center">
      <Card card={card} />
    </div>
  );
};

const CardsCarousel: FC<CarouselProps> = (props) => {
  const { cards } = props;
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {cards.map((card) => (
          <CardSlide key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsCarousel;
