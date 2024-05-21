"use client";

import { CustomChat, FacebookProvider } from "react-facebook";

const Messenger = () => {
  return (
    <FacebookProvider appId="769874795242233" chatSupport>
      <CustomChat pageId="2056191244610896" minimized={false} />
    </FacebookProvider>
  );
};

export default Messenger;
