import {
  Bell,
  CheckCheck,
  ChevronRight,
  PackageCheck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "Your order is ready",
    description: "Your order #12345 has been prepared and is ready for pickup.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "offer",
    title: "Special offer 🎉",
    description: "Get 20% off on selected ice cream this weekend.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "product",
    title: "New products available",
    description:
      "Check out our newest creamy flavors and find your new favorite.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 4,
    type: "order",
    title: "Order delivered",
    description: "Your order #12320 has been successfully delivered.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "system",
    title: "Welcome to CreamyCream!",
    description:
      "Thanks for joining CreamyCream. Enjoy your first order with us.",
    time: "2 days ago",
    unread: false,
  },
];

function NotificationIcon({ type }: { type: string }) {
  if (type === "order") {
    return <PackageCheck className="size-6 sm:size-7" />;
  }

  if (type === "offer") {
    return <Sparkles className="size-6 sm:size-7" />;
  }

  if (type === "product") {
    return <ShoppingBag className="size-6 sm:size-7" />;
  }

  return <Bell className="size-6 sm:size-7" />;
}

export default function NotificationsPage() {
  const unreadCount = NOTIFICATIONS.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <main className="min-h-screen px-c-5 pb-32 pt-c-15 sm:px-c-8 lg:px-10 lg:pb-c-20 lg:pt-c-25">
      <div className="mx-auto max-w-[1920px]">
        {/* Header */}
        <header className="mb-c-8 flex items-end justify-between gap-5 sm:mb-c-10">
          <div>
            <div className="mb-c-3 flex items-center gap-c-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-pink-500 text-white shadow-lg shadow-pink-500/20 sm:size-13">
                <Bell className="size-5 sm:size-6" />
              </div>

              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-950/30 dark:text-pink-400 sm:text-sm">
                {unreadCount} unread
              </span>
            </div>

            <h1 className="font-berkshire-swash text-4xl text-pink-500 sm:text-5xl lg:text-6xl">
              Notifications
            </h1>

            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              Stay up to date with your CreamyCream activity.
            </p>
          </div>

          <button
            type="button"
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-border
              px-5
              py-3
              text-sm
              font-medium
              text-muted-foreground
              transition-all
              hover:border-pink-300
              hover:bg-pink-50
              hover:text-pink-500
              lg:flex
              dark:hover:bg-pink-950/20
            "
          >
            <CheckCheck className="size-4" />
            Mark all as read
          </button>
        </header>

        {/* Notifications */}
        <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-black/5">
          {NOTIFICATIONS.map((notification, index) => (
            <article
              key={notification.id}
              className={`
                group
                relative
                flex
                gap-4
                px-5
                py-5
                transition-all
                hover:bg-muted/40
                sm:gap-5
                sm:px-7
                sm:py-7
                lg:px-8
                lg:py-8
                ${
                  index !== NOTIFICATIONS.length - 1
                    ? "border-b border-border"
                    : ""
                }
                ${
                  notification.unread ? "bg-pink-50/40 dark:bg-pink-950/10" : ""
                }
              `}
            >
              {/* unread indicator */}
              <div className="flex shrink-0 flex-col items-center">
                <div
                  className={`
                    grid
                    size-12
                    place-items-center
                    rounded-2xl
                    sm:size-14
                    lg:size-15
                    ${
                      notification.unread
                        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  <NotificationIcon type={notification.type} />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="flex items-center gap-2">
                    <h2
                      className={`
                        text-base
                        sm:text-lg
                        lg:text-xl
                        ${notification.unread ? "font-bold" : "font-semibold"}
                      `}
                    >
                      {notification.title}
                    </h2>

                    {notification.unread && (
                      <span className="size-2 shrink-0 rounded-full bg-pink-500 sm:size-2.5" />
                    )}
                  </div>

                  <time className="shrink-0 text-sm text-muted-foreground sm:text-base">
                    {notification.time}
                  </time>
                </div>

                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:text-base lg:text-[17px]">
                  {notification.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden items-center text-muted-foreground transition-transform group-hover:translate-x-1 sm:flex">
                <ChevronRight className="size-5" />
              </div>
            </article>
          ))}
        </section>

        {/* Mobile mark all */}
        <button
          type="button"
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-border
            bg-card
            px-5
            py-4
            text-base
            font-medium
            text-muted-foreground
            transition-all
            hover:border-pink-300
            hover:text-pink-500
            lg:hidden
          "
        >
          <CheckCheck className="size-5" />
          Mark all as read
        </button>
      </div>
    </main>
  );
}
