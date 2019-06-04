## IOT Hubber

The purpose of this tool is to connect a "device" with the IOT-Hub, using certificate-based authentication and MQTT.

### Quick start guide

1) Copy the `.env.example` file in the root directory to a file called `.env`
2) Replace the values for `IOTHUB_URL` and `IOTHUB_BROKER` with real data
3) (Optional) Enter message templates for producing messages from the "device" to the IOT Hub
4) `yarn install`
5) `yarn start`
