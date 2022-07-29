import { useContext } from "react";
import { UnivContext } from "contexts/UnivContext";

export const useUnivContext = () => useContext(UnivContext);
