import React from "react";

interface Props {
  text: string;
}

export default function Button({ text }: Props) {
  return (
    <button className='p-2 bg-slate-500 hover:bg-slate-700 rounded-md transition-all duration-200'>
      {text}
    </button>
  );
}
