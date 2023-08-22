export enum CardTypeBalanceType {
  Money = "Money",
}

export enum CardTypeReplenishType {
  Online = "Online",
  Offline = "Offline",
}

export interface Card {
  id: number;
  userId: number;
  cardId: number;
  notificationSum: number | null;
  creationDate: string;
  cardNumber: string;
  cardTypeName: string;
  cardTypeId: number;
  cardTypeCode: number;
  cardTypeOrder: number;
  cardBalance: number;
  cardTripCount: number;
  cardBalanceDate: string;
  cardEndDate: string;
  cardTypeBalanceType: CardTypeBalanceType;
  cardTypeReplenishType: CardTypeReplenishType;
  isVirtual: boolean;
  name: string | null;
  autoReplenishBalance: number | null;
  autoReplenishSum: number | null;
  autoReplenishEnabled: boolean;
  bankCard: null;
  isDisplayBalance: boolean;
  isDisplayEndDate: boolean;
  imageUrl: string;
  isAvailableReplenishment: boolean;
  isAvailableAutoReplenishment: boolean;
}
