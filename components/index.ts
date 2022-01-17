import dynamic from "next/dynamic";

export const Board = dynamic(() => import("./Board"), { ssr: false });
