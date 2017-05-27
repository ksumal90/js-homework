/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');


/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
	var promise = new Promise (function(resolve, request){
		function sortArr(a,b){
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
		}
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
		xhr.send();
		xhr.addEventListener('load', function(){
			if (xhr.status < 400) {
				var array = JSON.parse(xhr.response);
				array.sort(sortArr);
				resolve(array);
			} else {
				request();
			}
		});
		
		
		

	});

	return promise;
}

loadTowns().
	then(
		function(array){
			loadingBlock.style.display = "none";
			filterBlock.style.display = "block";
			var ulElement = document.createElement('ul');
			filterResult.appendChild(ulElement);
			filterInput.addEventListener('keyup', function(e) {
				var valueInput = this.value;
				console.log (valueInput);

				ulElement.innerHTML = '';
				for (var i = 0; i<array.length; i++){
					if (isMatching(array[i].name, valueInput)){
						var liElement = document.createElement('li');
						liElement.textContent = array[i].name;
						ulElement.appendChild(liElement);

					} 
					if (valueInput == ''){
						ulElement.innerHTML = '';
					}
				}
			});
			ulElement.innerHTML = '';
		}, 
		function(){
			loadingBlock.style.display = "none";
			var divError = document.createElement('div');
			var buttonError = document.createElement('button');
			divError.textContent = 'Не удалось загрузить города';
			buttonError.textContent = 'Повторить';
			homeworkContainer.appendChild(divError);
			homeworkContainer.appendChild(buttonError);
			buttonError.addEventListener('click',loadTowns);
		}
	);

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
	if (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) {
		return true;
	} 
	return false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;



export {
    loadTowns,
    isMatching
};