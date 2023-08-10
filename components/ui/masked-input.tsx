"use client";

import { IMaskMixin } from "react-imask";
import { Input } from "./input";
import { Ref } from "react";

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef as Ref<HTMLInputElement>} />
));

export default MaskedInput;
