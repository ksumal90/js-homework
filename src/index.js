/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr.push(fn(array[i], i, array));
    }
    return arr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
 var i;
 var result;
    if (typeof initial !== 'undefined'){
        i = 0;
        result = initial;
    }
    else {
        i = 1;
        result = array[0];
    }
    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
  
   
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    for (var key in obj){
        if (key == prop) {
            return true;
        }
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var arr = [];
    for (var key in obj){
        arr.push(key);
    }

    return arr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var arr = [];
    for (var key in obj){
        arr.push(key.toUpperCase());
    }

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
    debugger;
    var arr = [];
    if (typeof from == 'undefined'){
       from = 0;
    }
    if (typeof to == 'undefined'){
        to = array.length;
    }
    if (from < 0){
        from = 0; //from += array.length;?
    }
    if (to < 0){
        to += array.length;
     }
    if (to > array.length) {
        to = array.length;
    }
    for (var i = from; i < to; i++){
        arr.push(array[i]);
    }

    return arr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
