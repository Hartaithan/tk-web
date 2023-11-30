import { getCardHistory } from "@/actions/history";
import Header from "@/components/layout/header";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { formatFullDate } from "@/lib/date";
import { cn } from "@/lib/styles";
import { HistoryPageParams } from "@/models/history";
import { Page } from "@/models/page";

const CardHistory: Page<HistoryPageParams> = async (props) => {
  const { params } = props;

  const history = await getCardHistory(params.id);

  return (
    <main className="flex flex-col">
      <Header title="История" back />
      <div id="content" className="flex flex-1 flex-col py-6 items-center">
        {history.status === 200 ? (
          <div className="w-full max-w-screen-lg">
            <Table>
              {history.data.length === 0 && (
                <TableCaption className="text-lg font-bold">
                  История пуста
                </TableCaption>
              )}
              <TableBody>
                {history.data.map((item) => {
                  const isReplenishment = item.type === 1;
                  return (
                    <TableRow key={item.date}>
                      <TableCell className="p-2">
                        <p
                          className={cn(
                            "font-bold mb-1",
                            isReplenishment && "text-primary",
                          )}>
                          {isReplenishment
                            ? "Пополнение"
                            : "Маршрут №" + item.routeNumber}
                        </p>
                        <p>{formatFullDate(item.date)}</p>
                      </TableCell>
                      <TableCell className="p-2">
                        {!isReplenishment && (
                          <>
                            <p
                              className={cn(
                                "font-bold mb-1",
                                isReplenishment && "text-primary",
                              )}>
                              {item.carNumber}
                            </p>
                            <p>номер автобуса</p>
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right text-2xl font-bold",
                          isReplenishment && "text-primary",
                        )}>
                        {isReplenishment ? "+" + item.sum : item.sum}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-center">
            Что-то пошло не так :(
          </h2>
        )}
      </div>
    </main>
  );
};

export default CardHistory;
