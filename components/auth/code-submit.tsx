import { FC, MouseEventHandler, useEffect } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useCountdown } from "usehooks-ts";

interface CodeSubmitProps extends ButtonProps {
  onCodeSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
}

const CodeSubmit: FC<CodeSubmitProps> = (props) => {
  const { onCodeSubmit, ...rest } = props;
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: 30,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
    return () => stopCountdown();
  }, []);

  return (
    <Button
      className="no-underline !opacity-100 text-gray-400 font-normal mb-4 w-full"
      variant="link"
      onClick={onCodeSubmit}
      disabled={count !== 0}
      {...rest}>
      {count > 0
        ? `Отправить код повторно через ${count} сек`
        : "Отправить код повторно"}
    </Button>
  );
};

export default CodeSubmit;
