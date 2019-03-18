node {
    // uncomment these 2 lines and edit the name 'node-4.4.7' according to what you choose in configuration
    // def nodeHome = tool name: 'node-4.4.7', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    // env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        sh "npm -v"
    }

    stage('checkout') {
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('clean') {
        sh "./mvnw clean"
    }

    stage('backend tests') {
        sh "./mvnw test"
    }

    stage('frontend tests') {
        sh "gulp test"
    }

    stage('packaging') {
        sh "./mvnw package -Pprod -DskipTests"
    }

    stage('code quality') {
        sh "./mvnw sonar:sonar -Dsonar.host.url=http://raspberrysqlserver.ddns.net:9000 -Dsonar.login=f088a92966698923a44e0b75731a72f28d7b2434"
    }
}
