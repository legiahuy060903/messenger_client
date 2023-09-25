import { useEffect } from "react";

const bo = ['ant-select-item-option-content']
const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target) || bo.includes(e.target.className)) {
                return;
            }
            handler(e);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
export default useOnClickOutside