"use client";

import { Bell, CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { hoverEffect, tapEffect } from "@/utils/motion-effects";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Your order is ready",
    description: "Your order #12345 has been prepared.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Special offer 🎉",
    description: "Get 20% off on selected ice cream.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "New products available",
    description: "Check out our newest creamy flavors.",
    time: "3 hours ago",
    unread: false,
  },
];

interface NotificationButtonProps {
  size?: string;
}

export default function NotificationButton({
  size = "size-c-5",
}: NotificationButtonProps) {
  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter(
    (notification) => notification.unread,
  ).length;

  const hasUnread = unreadCount > 0;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (!notificationRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={notificationRef} className="relative cursor-pointer">
      {/* Notification Button */}
      <motion.button
        type="button"
        whileHover={{ ...hoverEffect() }}
        whileTap={{ ...tapEffect() }}
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center"
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell
          className={`${size} cursor-pointer transition-colors hover:text-pink-500 active:text-pink-600`}
        />

        {/* Unread Indicator */}
        {hasUnread && (
          <span className="absolute -right-1 -top-1 flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-pink-500" />
          </span>
        )}
      </motion.button>

      <>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -8,
            }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="
              absolute
              right-0
              top-10
              z-50
              w-[calc(100vw-2rem)]
              max-w-c-90
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-card
              shadow-2xl
            "
            role="dialog"
            aria-label="Notifications"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-c-5 py-c-4">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">
                  Notifications
                </h2>

                <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">
                  You have {unreadCount} unread notifications
                </p>
              </div>

              <button
                type="button"
                className="
                  rounded-lg
                  p-1.5
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-pink-500
                "
                aria-label="Mark all as read"
              >
                <CheckCheck className="size-5" />
              </button>
            </div>

            {/* Notifications */}
            <div className="max-h-100 overflow-y-auto">
              {NOTIFICATIONS.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    relative
                    flex
                    gap-3
                    border-b
                    border-border
                    px-c-5
                    py-c-4
                    transition-colors
                    hover:bg-muted/50
                    ${
                      notification.unread
                        ? "bg-pink-50/50 dark:bg-pink-950/10"
                        : ""
                    }
                  `}
                >
                  {/* Unread Dot */}
                  <div className="pt-2">
                    <span
                      className={`
                        block
                        size-2.5
                        rounded-full
                        ${
                          notification.unread ? "bg-pink-500" : "bg-transparent"
                        }
                      `}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`
                          truncate
                          text-sm
                          sm:text-base
                          ${
                            notification.unread
                              ? "font-semibold"
                              : "font-medium"
                          }
                        `}
                      >
                        {notification.title}
                      </h3>

                      <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* See All */}
            <div className="border-t border-border p-c-3">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-pink-500
                  px-c-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-pink-600
                  active:scale-[0.98]
                  sm:text-base
                "
              >
                See all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </>
    </div>
  );
}
