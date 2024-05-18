"use client"

import { FacebookProvider, MessengerCheckbox } from 'react-facebook';

const Messenger = () => {
  return (
    <FacebookProvider appId="123456789">
      <MessengerCheckbox messengerAppId="123456789" pageId="123456789" />
    </FacebookProvider>
  );
};

export default Messenger;
