import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import share from '../svg/profile/share.svg';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const { href } = window.location;
  const hrefSplited = href.split('/in-progress');
  return (
    <>
      <button
        data-testid="share-btn"
        onClick={ () => clipboardCopy(hrefSplited[0]).then(() => {
          setCopied(true);
        }) }
      >
        <img src={ share } alt="" className="w-[25px] h-[25px]" />
      </button>
      {copied && <p>Link copied!</p>}
    </>
  );
}
