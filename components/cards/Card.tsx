import { formatDate } from "@/lib/date";
import { cn } from "@/lib/styles";
import { Card as CardItem } from "@/models/card";
import Image from "next/image";
import { FC } from "react";

interface Props {
  card: CardItem;
}

const Card: FC<Props> = (props) => {
  const { card } = props;
  const isKJY = card.cardTypeId === 9;

  return (
    <div
      className={cn(
        "h-48 aspect-[1000/631] rounded-[12px] overflow-hidden relative p-4 flex text-white",
        isKJY && "bg-gradient-to-b from-black/75 to-black/15",
      )}>
      <div id="left" className="flex flex-col flex-1">
        <h1 className="text-sm font-bold mb-4">
          {card?.name ?? "Название не найдено"}
        </h1>
        <p className="text-xs mb-2">
          {card?.cardTypeName ?? "Тип карты не найден"}
        </p>
        {card?.cardBalanceDate && (
          <p className="text-xs">
            Актуально на: {formatDate(card.cardBalanceDate)}
          </p>
        )}
        <p className="text-sm mt-auto">{card.cardNumber}</p>
      </div>
      <div id="right" className="flex flex-col items-end w-16">
        <h1 className="text-2xl font-bold mb-2">{card.cardBalance}</h1>
        <h1 className="text-sm">рублей</h1>
      </div>
      <Image
        className="-z-10"
        fill
        src={card.imageUrl}
        alt="card background image"
      />
    </div>
  );
};

export default Card;
