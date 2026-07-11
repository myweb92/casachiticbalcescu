const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

const originalScript = `    <!-- Cloudbeds Chat -->
    <script type="text/javascript" async defer>
      (function(){
        window.WhistleLiveChat={ company:"184869", source: "https://plugins.whistle.cloudbeds.com" };
        var e=document.createElement("script");
        e.async=!0;
        e.type="text/javascript";
        e.src=window.WhistleLiveChat.source + "/live-chat/initialize.js";
        var t=document.getElementsByTagName("script")[0];
        if(t && t.parentNode) {
          t.parentNode.insertBefore(e,t);
        } else {
          document.head.appendChild(e);
        }
      }())
    </script>`;

const newScript = `    <!-- Cloudbeds Chat -->
    <script type="text/javascript">
      // Only load Cloudbeds chat on production domains to avoid "Invalid Domain" whitelist errors in AI Studio preview.
      if (!window.location.hostname.includes('run.app') && !window.location.hostname.includes('localhost')) {
        (function(){
          window.WhistleLiveChat={ company:"184869", source: "https://plugins.whistle.cloudbeds.com" };
          var e=document.createElement("script");
          e.async=!0;
          e.type="text/javascript";
          e.src=window.WhistleLiveChat.source + "/live-chat/initialize.js";
          var t=document.getElementsByTagName("script")[0];
          if(t && t.parentNode) {
            t.parentNode.insertBefore(e,t);
          } else {
            document.head.appendChild(e);
          }
        }());
      }
    </script>`;

if (index.includes('<!-- Cloudbeds Chat -->')) {
    index = index.replace(/<!-- Cloudbeds Chat -->.*?(?=<\/head>)/s, newScript + '\n  ');
    fs.writeFileSync('index.html', index);
}

