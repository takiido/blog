"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const headerLinks = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {headerLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? styles.header_link__active
                : styles.header_link
            }
          >
            {link.label}
          </Link>
        );
      })}
    </header>
  );
};

export default Header;
