import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import ShareIco from '../assets/share_icon.svg';
import CommentsIco from '../assets/comments_ico.svg';
import FavoritesIco from '../assets/favorites_ico.svg';
import PageUpIco from '../assets/pageup_ico.svg';
import { useLocal } from '../../hooks';

export default function Tapbar() {
  const [commentCount, setCommentCount] = useState(7);
  const [favoritesCount, setFavoritesCount] = useState(28);
  const [isHidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const tapbarClass = clsx(styles.tapbarContainer, isHidden && styles.hidden);

  const localComment = useLocal('commentCount');
  useEffect(() => {
    if (localComment) {
      setCommentCount(localComment);
    }
  }, [localComment]);

  let timeout: NodeJS.Timeout;
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll-lastScroll > 200) {
      setHidden(true);
    } else if (lastScroll - currentScroll > 1) {
      setHidden(false);
    }

    setLastScroll(currentScroll);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setHidden(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCommentsCount = () => {
    const nextCount = commentCount + 1;
    setCommentCount(nextCount);
    window.localStorage.setItem('commentCount', nextCount.toString());
  };

  const handleFavoritesCount = () => {
    setFavoritesCount((prev) => prev + 1);
  };

  return (
    <div className={tapbarClass}>
      <button className={styles.tapbarButton} onClick={handleShare}>
        <img src={ShareIco} alt="share" />
      </button>
      <button className={styles.tapbarButton} onClick={handlePageUp}>
        <img src={PageUpIco} alt="pageUp" />
      </button>
      <button className={styles.tapbarButton} onClick={handleCommentsCount}>
        <img src={CommentsIco} alt="comments" />
        {commentCount && <span>{commentCount}</span>}
      </button>
      <button className={styles.tapbarButton} onClick={handleFavoritesCount}>
        <img src={FavoritesIco} alt="favorites" />
        {favoritesCount && <span>{favoritesCount}</span>}
      </button>
    </div>
  );
}
