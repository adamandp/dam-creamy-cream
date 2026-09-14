"use client";

import {
  BadgePercentIcon,
  HomeIcon,
  Search,
  StoreIcon,
  // UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SearchBar } from "./search-bar";
import { hoverEffect, tapEffect } from "@/utils/motion-effects";
import CartButton from "./cart-button";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import NotificationButton from "./notification-button";
// import { Button } from "../ui/button";

const NAV_ITEMS = [
  {
    name: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    name: "Special Offers",
    href: "/offers",
    Icon: BadgePercentIcon,
  },
  {
    name: "Shop",
    href: "/shop",
    Icon: StoreIcon,
  },
];

export default function Navbar() {
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  return (
    <header className="lg:pb-c-18-5 pt-c-5-5">
      <div className="hidden max-w-480 lg:flex justify-between items-center bg-card w-[90%] rounded-full shadow-2xl px-c-10 py-c-2 fixed left-1/2 transform -translate-x-1/2 z-50">
        <section>
          <Link href={"/"} className="flex items-center gap-c-2">
            <Image
              src={"/logo.svg"}
              alt="Logo"
              width={1000}
              height={1000}
              className="w-c-10"
            />
            <h1 className="font-berkshire-swash text-pink-500 text-c-8">
              Creamy<span className="text-purple-700">Cream</span>
            </h1>
          </Link>
        </section>
        <motion.section
          className="flex items-center gap-c-10"
          layout
          layoutDependency={activeSearchBar}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.8, 0.25, 1],
            delay: activeSearchBar ? 0 : 0.25,
          }}
        >
          <ul className="flex items-center gap-c-5">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative inline-block text-c-4 font-medium transition-all duration-300 ease-in-out hover:text-pink-500 active:text-pink-600 hover:scale-105 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-c-5 relative">
            <AnimatePresence initial={false}>
              {activeSearchBar ? (
                <motion.div
                  key="searchbar"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.175, 0.885, 0.32, 1.275],
                  }}
                  className="w-c-50"
                >
                  <SearchBar setActiveSearchBar={setActiveSearchBar} />
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  whileHover={{ ...hoverEffect() }}
                  whileTap={{ ...tapEffect() }}
                >
                  <Search
                    onClick={() => setActiveSearchBar(true)}
                    className="size-c-5 cursor-pointer hover:text-pink-500 active:text-pink-600"
                  />
                </motion.div>
              )}
              <Link href={"/carts"} id="cart-button-desktop">
                {/* <CartButton /> */}
              </Link>
              <NotificationButton />
            </AnimatePresence>
            <ThemeToggle />
          </ul>
          {/* <Link href={"/profile"}>
            <Button size={"icon"}>
              <UserIcon className="size-c-5" />
            </Button>
          </Link> */}
        </motion.section>
      </div>
      <div className="fixed bottom-[5%] left-1/2 transform -translate-x-1/2 z-50 mx-auto max-w-c-150 w-[90%] flex items-center gap-c-2 justify-between lg:hidden">
        <div className="bg-card px-c-5 py-c-7 rounded-full shadow-2xl flex items-center justify-evenly gap-c-6 drop-shadow-2xl text-foreground w-full">
          {NAV_ITEMS.map((item, index) => {
            const isSpecial = index === 2;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center transition-all duration-300 ease-out ${
                  isSpecial ? "relative z-10" : "hover:scale-110"
                }`}
              >
                {isSpecial ? (
                  <div className="absolute -bottom-c-5 left-1/2 transform -translate-x-1/2 bg-pink-500 p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                    <item.Icon className="size-c-7 md:size-c-9 text-white" />
                  </div>
                ) : (
                  <motion.div
                    key={item.href}
                    whileHover={{ ...hoverEffect() }}
                    whileTap={{ ...tapEffect() }}
                  >
                    <item.Icon className="size-c-7 md:size-c-9 hover:text-pink-500 active:text-pink-600 transition-transform transform" />
                  </motion.div>
                )}
              </Link>
            );
          })}
          <Link href={"/carts"} id="cart-button-mobile">
            <CartButton />
          </Link>

          <NotificationButton size="size-c-7 md:size-c-9" />

          {/* <Link href="/profile" id="cart-button-mobile">
            <motion.div
              whileHover={{ ...hoverEffect() }}
              whileTap={{ ...tapEffect() }}
            >
              <UserIcon className="size-c-7 md:size-c-9 hover:text-pink-500 active:text-pink-600 transition-transform transform" />
            </motion.div>
          </Link> */}
          <ThemeToggle size="size-c-7 md:size-c-9 lg:size-c-5 cursor-pointer hover:text-pink-500 active:text-pink-600" />
        </div>
        {/* <div className="bg-card p-c-5 rounded-full shadow-2xl hidden sm:grid place-items-center   left-full">
          <ThemeToggle size="size-c-5 md:size-c-9" />
        </div> */}
      </div>
    </header>
  );
}
