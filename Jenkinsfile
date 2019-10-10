pipeline {
	options {
		buildDiscarder(logRotator(numToKeepStr: '5'))
	}

	environment {
		TEMPORARY_WORKING_DIR = "/tmp/app"
        APPLICATION_PATH = "/iot-hubber-client"
		VERSION = sh(script: "echo \$(cat package.json | grep version | head -1 | awk -F: '{ print \$2 }' | sed 's/[\" ,]//g')", , returnStdout: true).trim()
	}

    stages {
		stage('Build and upload docker image') {
			steps {
				script {
					docker.withRegistry('https://docker.device-insight.com', 'jenkinsldap') {
						sh "echo ${env.VERSION}"
						def iotHubberImage = docker.build("lamtec/iot-hubber:${env.VERSION}")
						iotHubberImage.push()
						iotHubberImage.push("latest")
					}
				}
			}
		}
    }

	agent {
		label "DI2"
	}
}
