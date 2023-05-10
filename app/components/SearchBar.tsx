"use client";
/* client component can't have a server component
unless server component is child of client component */

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangeEvent } from "react";
import { KeyboardEvent } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [name, setName] = useState("");

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onClickSearchHandler = () => {
    if (name === "") {
      router.push(`/search`);
      return;
    }
    router.push(`/search?nameSport=${name}`);
    setName("");
  };

  // press enter to search
  const onKeyPressSearchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e) return;

    if (e.key === "Enter") onClickSearchHandler();
  };

  return (
    <div className="flex justify-center py-1 m-auto text-lg text-left md:py-3">
      <input
        className="rounded mr-3 p-2 md:w-[450px] w-[250px]"
        type="text"
        placeholder="ชื่อกีฬา"
        value={name}
        onChange={onChangeSearchHandler}
        onKeyPress={onKeyPressSearchHandler}
      />
      <button
        className="px-4 py-2 text-white bg-red-600 rounded md:px-9"
        onClick={onClickSearchHandler}
      >
        ค้นหา
      </button>
    </div>
  );
}
