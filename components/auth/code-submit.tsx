import {
  ForwardRefRenderFunction,
  MouseEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { Button, ButtonProps } from "../ui/button";
import { useCountdown } from "usehooks-ts";

interface CodeSubmitProps extends ButtonProps {
  onCodeSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface CodeSubmitHandle {
  reset: () => void;
}

const CodeSubmit: ForwardRefRenderFunction<
  CodeSubmitHandle,
  CodeSubmitProps
> = (props, ref) => {
  const { onCodeSubmit, ...rest } = props;
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 30,
      intervalMs: 1000,
    });

  useImperativeHandle(ref, () => ({
    reset: () => resetCountdown(),
  }));

  useEffect(() => {
    startCountdown();
    return () => stopCountdown();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export default forwardRef(CodeSubmit);
