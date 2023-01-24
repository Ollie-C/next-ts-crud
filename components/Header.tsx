import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

  let left = (
    <div className={styles.nav__left}>
      <Link href="/">
        <p data-active={isActive("/")}>Feed</p>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    <div className={styles.nav__right}>
      <p>Validating session . . .</p>
    </div>;
  }

  if (!session) {
    right = (
      <div className={styles.nav__right}>
        <Link href="/api/auth/signin">
          <p data-active={isActive("/signup")}>Log in</p>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className={styles.nav__left}>
        <Link href="/">
          <p data-active={isActive("/")}>Feed</p>
        </Link>
        <Link href="/drafts">
          <p data-active={isActive("/drafts")}>My drafts</p>
        </Link>
      </div>
    );
    right = (
      <div className={styles.nav__right}>
        <p>
          {session.user?.name} ({session.user?.email})
        </p>
        <Link href="/create">
          <button>New Post</button>
        </Link>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
    );
  }

  return (
    <nav className={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
