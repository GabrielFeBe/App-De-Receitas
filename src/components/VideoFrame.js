import React from 'react';
import PropTypes from 'prop-types';

export default function VideoFrame({ urlForVideo }) {
  return (
    <section
      className="w-[250px] smd:w-[335px] m-auto"
    >
      <h2 className="ml-[10px]">Video</h2>
      <iframe
        width="100%"
        height="315"
        src={ urlForVideo }
        data-testid="video"
        title="YouTube video player"
        allowfullscreen
      />

    </section>
  );
}

VideoFrame.propTypes = {
  urlForVideo: PropTypes.string.isRequired,
};
