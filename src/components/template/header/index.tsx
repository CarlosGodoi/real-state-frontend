"use client";

import Link from "next/link";
import React from "react";
import { Navbar } from "../../navbar";
import { MenuMobo } from "@/components/menuMobo";
import { useMediaQueries } from "@react-hook/media-query";

export const Header: React.FC = () => {
  const { matches } = useMediaQueries({
    screen: "screen",
    width: "(max-width: 415px), (max-width: 767px)",
  });
  return (
    <div className="w-full bg-medium_gray flex justify-between items-center p-2 opacity-60">
      <h2 className="text-2xl text-zinc-100 border-b-2 border-amber-200">
        <Link href={"/immobiles"}>Real State</Link>
      </h2>
      {matches.width ? <MenuMobo /> : <Navbar />}
    </div>
  );
};
