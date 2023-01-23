import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className={styles.nav__left}>
      <Link href="/">
        <p data-active={isActive("/")}>Feed</p>
      </Link>
    </div>
  );

  let right = null;

  return (
    <nav className={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
