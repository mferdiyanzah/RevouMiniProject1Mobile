import React, { useEffect, useState } from 'react';

interface SVGImageProps {
  src: string;
}

const SVGImage = ({ src, ...props }: SVGImageProps) => {
  const [svg, setSVG] = useState<string>('');

  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(svgResult => setSVG(svgResult));
  }, [src]);

  return <div {...props} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default SVGImage;
