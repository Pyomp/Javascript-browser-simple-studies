# Simple DataChannel RTC setup

## Dependencies

 - ws for node js, https://www.npmjs.com/package/ws

## Use

 - $> npm i
 - $> node server.js
 - open http://localhost on 2 browsers
 - click createOffer on one
 - spam pingBtn as you want (look console)

## Commentary

This test doesn't show the STUN/TURN stuff. I actually don't understand why we need this in real implementation and what is going on this server during a communication. I suppose it's just 'broadcast' server used to bypass firewall security. However, it's not my priority to study this :(.