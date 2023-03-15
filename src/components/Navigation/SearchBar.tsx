import React, { FormEvent, useRef } from "react";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
export default function SearchBar({ query, setQuery, onSubmit }: Props) {
  const inputField = useRef<HTMLInputElement>(null);
  return (
    <form
      noValidate
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
        inputField.current?.blur();
      }}
      className="flex min-w-[500px] flex-grow items-center"
    >
      <input
        ref={inputField}
        type="text"
        id="query"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
        className="placeholder-neutral-light-light h-max flex-grow rounded-lg border-none bg-neutral p-2 text-sm font-medium text-neutral-inactive ring-0 focus:border-primary-dark focus:ring-primary"
        placeholder="Keresés"
        required
      />
    </form>
  );
}
