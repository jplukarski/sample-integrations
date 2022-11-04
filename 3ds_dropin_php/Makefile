all: install start

start:
	@echo "starting app"
	@php -S localhost:3000 -t public_html

install_locally:
	@echo "installing dependencies...."
	@php composer.phar install

install:
	@echo "installing dependencies...."
	@composer install
