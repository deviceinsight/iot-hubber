pipeline {
	options {
		buildDiscarder(logRotator(numToKeepStr: '5'))
	}

	environment {
		DOCKER_WORKING_DIR = "/tmp/app"
        APPLICATION_PATH = "/iot-hubber-client"
	}

    stages {
		stage('Build and upload docker image') {
			steps {
				script {
					withCredentials([
						usernamePassword(credentialsId: 'jenkinsldap',
						usernameVariable: 'DOCKER_USERNAME',
						passwordVariable: 'DOCKER_PASSWORD')
					]) {
						docker.image("node:10.15.1").inside("-v ${env.WORKSPACE}:${env.APPLICATION_PATH}:ro") {
							sh "mkdir ${DOCKER_WORKING_DIR}"
							sh "cp -r ${env.APPLICATION_PATH}/* ${DOCKER_WORKING_DIR}"
							sh "cd ${DOCKER_WORKING_DIR}"
							sh "VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\" ,]//g')"
							sh "yarn predocker"
							sh "docker login https://docker.device-insight.com --username $DOCKER_USERNAME --password $DOCKER_PASSWORD"
							sh "docker build . -t deviceinsight/iot-hubber:$VERSION"
							sh "docker push docker.device-insight.com/deviceinsight/iot-hubber:$VERSION"
							sh "rm -rf ${DOCKER_WORKING_DIR}"
						}
					}
				}
			}
		}
    }

	agent {
		label "DI2"
	}
}
