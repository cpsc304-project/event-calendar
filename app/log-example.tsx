"use client"

import { useLogger } from "next-axiom";

export default function LogButton() {
    const log = useLogger();

    const onClick = () => {
        log.info("Clicked log demo button", { some: "data", very: true, cool: 420 });
        const error1 = new Error("Base Error", { cause: { key: "value", pairs: true } });
        const error2 = new Error("Wrapped Error 1", { cause: error1 });
        const error3 = new Error("Wrapped Error 2", { cause: error2 });
        log.error("Example error log", error3);
    };

    return (
        <button className="px-4 py-2 bg-slate-600 rounded" onClick={onClick}>Click me to log some stuff</button>
    )
}