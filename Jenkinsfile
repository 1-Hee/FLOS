def component = [
	Nginxapp: true, // 프론트 서버 사용 여부
	Springapp: false, // 백 서버 사용 여부
	Pythonapp: false // 테스트 서버 사용 여부
]
pipeline {
	agent any
	stages {
		stage("Checkout") {
			steps {
				checkout scm
			}
		}
		stage("Build") {
			steps {
				script {	
					component.each{ entry ->
						stage ("${entry.key} Build"){
							if(entry.value){
								var = entry.key
								sh "docker-compose build ${var.toLowerCase()}"
							}
						}
					}
				}
			}
		}
		stage("Tag and Push") {
			steps {
				script {
					sh "mkdir -p springapp"
					sh "echo 'BUILD_NUMBER=${BUILD_NUMBER}' > springapp/.env"
					component.each{ entry ->
						stage ("${entry.key} Push"){
							if(entry.value){
								var = entry.key
								withCredentials([[$class: 'UsernamePasswordMultiBinding',
								credentialsId: 'docker-access-token',
								usernameVariable: 'DOCKER_USER_ID',
								passwordVariable: 'DOCKER_USER_PASSWORD'
								]]){
								sh "docker tag flos_pipeline_sub_${var.toLowerCase()}:latest ${DOCKER_USER_ID}/flos_pipeline_${var.toLowerCase()}:${BUILD_NUMBER}"
								sh "docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}"
								sh "docker push ${DOCKER_USER_ID}/flos_pipeline_${var.toLowerCase()}:${BUILD_NUMBER}"
								}
							}
						}
					}
				}
			}	
		}
		stage("publish") {
			steps {
				script {
					sshPublisher(
						publishers: [
							sshPublisherDesc(
								configName: 'ubuntu', 
								transfers: [
									sshTransfer(
										cleanRemote: false, 
										excludes: '', 
										execCommand: '''
sudo docker-compose pull
sudo docker-compose up --force-recreate -d''', 
										execTimeout: 120000, 
										flatten: false, 
										makeEmptyDirs: false, 
										noDefaultExcludes: false, 
										patternSeparator: '[, ]+', 
										remoteDirectory: '', 
										remoteDirectorySDF: false, 
										removePrefix: '', 
										sourceFiles: 'springapp/.env'
									)
								], 
								usePromotionTimestamp: false, 
								useWorkspaceInPromotion: false, 
								verbose: true
							)
						]
					)
				}
			}
		}
	}
}
