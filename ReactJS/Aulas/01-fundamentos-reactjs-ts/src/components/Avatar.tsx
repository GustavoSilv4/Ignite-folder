import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  url: string;
}

export function Avatar({ hasBorder = true, url }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={url}
    />
  );
}
