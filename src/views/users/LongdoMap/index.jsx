import React, { useEffect } from 'react';

export let longdo;
export let map;

function LongdoMap(props) {
  useEffect(() => {
    const existingScript = document.getElementById('longdoMapScript');
    const callback = props.callback;

    function mapCallback() {
      longdo = window.longdo;
      map = new window.longdo.Map({
        placeholder: document.getElementById(props.id),
        language: 'en',
      });
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://api.longdo.com/map/?key=${props.mapKey}`;
      script.id = 'longdoMapScript';
      document.body.appendChild(script);

      script.onload = () => {
        mapCallback();
        if (callback) callback();
      };
    }

    if (existingScript) mapCallback();
    if (existingScript && callback) callback();
  }, [props.callback, props.id, props.mapKey]);

  return <div id={props.id} style={{ width: '100%', height: '100%' }} />;
}

export default LongdoMap;