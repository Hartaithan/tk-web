import { getCardHistory } from "@/actions/history";
import DynamicHeader from "@/components/layout/dynamic-header";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { formatFullDate } from "@/lib/date";
import { HistoryPageParams } from "@/models/history";
import { Page } from "@/models/page";

const CardHistory: Page<HistoryPageParams> = async (props) => {
  const { params } = props;

  const history = await getCardHistory(params.id);

  return (
    <main className="flex flex-col">
      <DynamicHeader title="История" back />
      <div id="content" className="flex flex-1 flex-col py-6 items-center">
        {history.status === 200 ? (
          <div className="w-full max-w-screen-lg">
            <Table>
              {history.data.length === 0 && (
                <TableCaption className="text-lg font-bold">
                  История пуста
                </TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Маршрут</TableHead>
                  <TableHead className="w-[200px]">Номер автобуса</TableHead>
                  <TableHead>Дата оплаты</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.data.map((item) => (
                  <TableRow key={item.date}>
                    <TableCell className="font-medium">
                      №{item.routeNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.carNumber}
                    </TableCell>
                    <TableCell>{formatFullDate(item.date)}</TableCell>
                    <TableCell className="text-right text-lg font-bold">
                      {item.sum}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <h2 className="text-2xl font-bold">Что-то пошло не так :(</h2>
        )}
      </div>
    </main>
  );
};

export default CardHistory;
