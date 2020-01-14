## IOT Hubber

The purpose of this tool is to connect a "device" with the IOT-Hub, using certificate-based authentication and MQTT.

### Quick start guide

1) Copy the `.env.example` file in the root directory to a file called `.env`
2) Replace the values for `IOTHUB_URL` and `IOTHUB_BROKER` with real data
3) (Optional) Enter message templates for producing messages from the "device" to the IOT Hub
4) `yarn install`
5) `yarn start`

### Build

`docker build -t <some_name>`


### Run Docker Image
Note that you need to replace IOTHUB_URL with the url to your IoT-Hub installation

`docker run -p 8080:8080 -e "IOTHUB_URL=$IOTHUB_URL" -e "IOTHUB_BROKER=tls://$IOTHUB_URL:8883" <some_name>`

Then navigate your browser to: `http://localhost:8080/iot-hubber/`

### Contributing

We are happy to receive contributions.
Before you make a Pull Request, please check the open issues for a topic you want to get involved in.
If you open a Pull Request with something of your own initiative, that's fine too, but bear in mind that the Pull Request may be closed if we don't consider it relevant at the moment.

