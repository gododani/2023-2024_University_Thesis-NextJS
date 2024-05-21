"use client";

import {
  CustomChat,
  FacebookProvider,
  MessageUs,
  MessengerCheckbox,
  SendToMessenger,
} from "react-facebook";

const Messenger = () => {
  return (
    <>
      {/*custom chat*/}
      <FacebookProvider appId="769874795242233" chatSupport>
        <CustomChat pageId="2056191244610896" minimized={false} />asd
      </FacebookProvider>
      {/*message us*/}
      {/* <FacebookProvider appId="769874795242233">
        <MessageUs messengerAppId="roland.bek" pageId="2056191244610896" />
      </FacebookProvider> */}
      {/*send to messenger*/}
      {/* <FacebookProvider appId="769874795242233">
        <SendToMessenger messengerAppId="roland.bek" pageId="2056191244610896" />
      </FacebookProvider> */}
      {/*messenger checkbox*/}
      {/* <FacebookProvider appId="769874795242233">
        <MessengerCheckbox
          messengerAppId="roland.bek"
          pageId="2056191244610896"
        />
      </FacebookProvider> */}
    </>
  );
};

export default Messenger;
