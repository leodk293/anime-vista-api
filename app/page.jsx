"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  async function getApiAnimeList() {
    try {
      const res = await fetch("/api/anime-vista-list", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`An error has occurred : ${res.status}`);
      }

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getApiAnimeList();
  }, []);
  return <div></div>;
}
