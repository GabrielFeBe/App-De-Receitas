import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const { href } = window.location;
  return (
    <>
      <button
        data-testid="share-btn"
        onClick={ () => clipboardCopy(href).then(() => {
          setCopied(true);
        }) }
      >
        ShareButton
      </button>
      {copied && <p>Link copied!</p>}
    </>
  );
}
