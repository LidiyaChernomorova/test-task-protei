# MyDreamApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Тестовое задание на позицию Frontend Developer в НТЦ Протей

Необходимо реализовать систему просмотра объектов на карте. 

Страница должна быть поделена на 2 области:

*	Список объектов.
*	Карта, на которой отображаются объекты.

# Дополнительные сведения
* Объекты подгружаются из JSON-файла.
* При выделении объекта на карте маркер должен менять цвет на другой, а соответствующее поле в списке выделяться.Такое же поведение должно быть, когда выбор происходит из списка. При выделении маркера карта должна центрироваться на нем.
* Если был выделен объект на карте и выделяется другой объект, то выделение с предыдущего элемента должно сняться.
* Возможность во время работы добавить новый объект на карту (в json изменения сохранять не нужно).
* Возможность во время работы удалить объект на карте (в json изменения сохранять не нужно).
* Возможность фильтровать список объектов.

# Требования

* Реализовать с использованием Angular 8+.
* Не использовать препроцессоры css, но можно использовать postCSS.
* Для карт использовать библиотеку Leaflet.
* Не использовать ui-фреймворки (Bootstrap, Material и т.п.).
* Задание должно быть написанно на TypeScript.

# Дополнительные требования (не обязательно, но будет плюсом)
* Разбить объекты на группы и добавить возможность скрывать/показывать эти группы на карте.
* Сделать пагинацию для списка объектов.
* Сделать добавление объекта с помощью всплывающих окон.
* Сделать окно с подтверждением удаления объекта.
* Написать тесты.

# Выполнение
Код должен быть выложен на github. После выполнения необходимо выслать ссылку на репозиторий.

# Полезные ссылки

* https://angular.io/styleguide
* https://github.com/boykovdmitriy/angular2modal
* https://github.com/boykovdmitriy/angular2Leaflet