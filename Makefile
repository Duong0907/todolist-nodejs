create_db_container:
	docker run -d -p 3306:3306 --name mysql-todolist -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todolist mysql:8
