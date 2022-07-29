import { UNIV } from "constant";
import { createContext, FC, useState } from "react";

interface IUnivContext {
  univ: UNIV;
  setUniv: Function;
}

export const UnivContext = createContext<IUnivContext>({
  univ: UNIV.korea,
  setUniv: () => {},
});

const UnivContextProvider: FC = ({ children }) => {
  const [univ, setUniv] = useState(UNIV.korea);

  return <UnivContext.Provider value={{ univ: univ, setUniv: setUniv }}>{children}</UnivContext.Provider>;
};

export default UnivContextProvider;
