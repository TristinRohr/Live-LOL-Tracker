// src/components/BuildWidget.js
import React from 'react';

const BuildWidget = ({ champion, layout, role }) => {
  return (
    <div className="league-widget" data-moba-widget="build">
      <script type="application/json">
        {JSON.stringify({ champion, layout, role })}
      </script>
    </div>
  );
};

export default BuildWidget;