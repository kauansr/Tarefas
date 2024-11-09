use tarefas;
drop table tarefas;
drop table users;

create table if not exists users(
id int auto_increment primary key,
username VARCHAR(255) unique not null,
email VARCHAR(255) unique not null,
userpassword VARCHAR(255) not null
);

create table if not exists tarefas(
id int auto_increment primary key,
user_id int,
tarefa VARCHAR(255) not null,
foreign key (user_id) references users(id) on delete CASCADE
);