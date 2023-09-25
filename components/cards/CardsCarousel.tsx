"use client";

import { Card as CardItem } from "@/models/card";
import useEmblaCarousel from "embla-carousel-react";
import { FC } from "react";
import Card from "./Card";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/styles";

interface CarouselProps {
  cards: CardItem[];
}

interface CardProps {
  card: CardItem;
}

const CardSlide: FC<CardProps> = (props) => {
  const { card } = props;

  return (
    <div className="flex-[0_0_100%] min-w-0 flex flex-col items-center">
      <Card card={card} />
      <Link
        href={`/card/${card.id}`}
        className={cn("mt-4", buttonVariants({ variant: "outline" }))}>
        История
      </Link>
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
