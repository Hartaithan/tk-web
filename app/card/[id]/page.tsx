import { getCardHistory } from "@/actions/history";
import { HistoryPageParams } from "@/models/history";
import { Page } from "@/models/page";

const CardHistory: Page<HistoryPageParams> = async (props) => {
  const { params } = props;

  const history = await getCardHistory(params.id);

  return (
    <main className="flex flex-col">
      <div id="content" className="flex flex-1 flex-col py-6">
        {history.status === 200 ? (
          <pre>{JSON.stringify(history.data, null, 2)}</pre>
        ) : (
          <h2 className="text-2xl font-bold">Что-то пошло не так :(</h2>
        )}
      </div>
    </main>
  );
};

export default CardHistory;
